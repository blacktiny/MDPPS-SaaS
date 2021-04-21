import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import { useDispatch, useStore } from 'react-redux'
import BrandCompanyForm from './form'
import { Loader } from '../../../../../components/atoms/Loader'
import { switchAccountCompany } from 'store/auth'
import axios from 'utils/http/client'
import { createFormData } from 'utils/helpers'

interface Props extends RouteComponentProps {}

interface FormDataType {
  legalName: string
  dba: string
  taxId: string
}

export const BrandCompany: React.FC<Props> = () => {
  const store = useStore()
  const dispatch = useDispatch()

  const auth = store.getState()?.auth

  const initialData = {
    id: 0,
    legalName: '',
    dba: '',
    taxType: 'ein',
    taxId: '',
    businessLicense: null,
    dealerNetworkAgreement: null,
    entityType: '',
    industry: '',
    categories: [],
    productLines: [],
    services: [],
    attributes: [],
    logo: {
      name: '',
      type: '',
      file: '',
      file_cropped: ''
    }
  }

  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showErrors, setShowErrors] = useState({
    legalName: false,
    dba: false,
    taxId: false,
    entityType: false
  })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  })
  const [dbaRequired, setDbaRequired] = useState(false)

  const nextStep = useMemo(() => {
    if (auth?.user.initial_account_type === 'employee') return 'finish'
    return 'address'
  }, [auth])

  const handleChange = useCallback(
    (key, value) => {
      setData({ ...data, [key]: value })

      if (key === 'businessLicense') uploadBlobFile('business_licence', value)
      else if (key === 'dealerNetworkAgreement') uploadBlobFile('dealer_network_agreement', value)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  const updateProfileAvatar = useCallback(
    (file, image) => {
      const logoData = {
        ...data.logo,
        file: file?.preview || '',
        name: file?.name || '',
        type: file?.type || '',
        file_cropped: image
      }

      setData({
        ...data,
        logo: logoData
      })

      uploadBlobFile('logo', logoData)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, croppedAreaPixels]
  )

  const updateCroppedAreaPixels = useCallback(data => {
    setCroppedAreaPixels(data)
  }, [])

  useEffect(() => {
    if (auth?.user?.active_company && auth?.user?.active_company.id) {
      axios({
        url: `companies/${auth?.user?.active_company.id}/`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          const { data, status } = response
          if (status === 200 && data && data.id) {
            const { business_licence, dealer_network_agreement } = data
            setData({
              id: data.id,
              legalName: data.business_name,
              dba: data.dba === 'undefined' ? '' : data.dba,
              taxType: data.tax_identifier_selected || 'ein',
              taxId: data.tax_identifier,
              businessLicense:
                business_licence && business_licence.file
                  ? {
                      name: `${business_licence.caption.replaceAll(' ', '-')}.pdf`,
                      preview: business_licence.file
                    }
                  : null,
              dealerNetworkAgreement:
                dealer_network_agreement && dealer_network_agreement.file
                  ? {
                      name: `${dealer_network_agreement.caption.replaceAll(' ', '-')}.pdf`,
                      preview: dealer_network_agreement.file
                    }
                  : null,
              entityType: data.business_entity_type || '',
              industry: data.industry?.url || '',
              categories: data.category || [],
              productLines: data.product_lines || [],
              services: data.services || [],
              attributes: data.attributes || [],
              logo: data.logo
            })
            setDbaRequired(data.use_legal_name)
          }
        })
        .catch(error => {
          if (error.status) {
            const {
              data: { message },
              status
            } = error.response

            if (status === 400) {
              console.log('[API POST /companies] error = ', message)
              setError(error)
            }
          } else {
            console.log('[API POST /companies] error = ', error)
          }
        })
    }
  }, [auth])

  const makingBlobFormData = async (form, type, uploadingData) => {
    if (type === 'logo') {
      let blobOrigin = uploadingData?.file ? await fetch(uploadingData?.file).then(r => r.blob()) : null
      if (blobOrigin) {
        var originFile = new File([blobOrigin], uploadingData.name, {
          type: uploadingData.type,
          lastModified: new Date().getTime()
        })
        form.append('logo', originFile, uploadingData.name)
        form.append('crop', JSON.stringify(croppedAreaPixels))
      } else {
        form.append('logo', new File([''], ''))
        form.append('crop', null)
      }
    } else {
      let blobData = uploadingData?.preview ? await fetch(uploadingData?.preview).then(r => r.blob()) : null
      if (blobData) {
        var pdfFile = new File([blobData], uploadingData.name, {
          type: uploadingData.type,
          lastModified: new Date().getTime()
        })
        form.append(type, pdfFile, uploadingData.name)
      } else {
        form.append(type, null)
      }
    }

    return form
  }

  const uploadBlobFile = useCallback(
    async (type, uploadingData) => {
      if (data.legalName) {
        let form = new FormData()

        setLoading(true)

        form = await makingBlobFormData(form, type, uploadingData)

        axios({
          url: `companies/${data.id ? data.id + '/' : ''}`,
          method: data.id ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: form
        })
          .then(response => {
            const { data, status } = response
            if ((status === 200 || status === 201) && data && data.id) {
              setLoading(false)
            }
          })
          .catch(error => {
            const { status } = error.response

            if (status === 400) {
              setError(error)
            }
          })
          .finally(() => {
            setLoading(false)
          })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [croppedAreaPixels, data.id]
  )

  const onSubmit = async (formData: FormDataType) => {
    setShowErrors({
      legalName: false,
      dba: false,
      taxId: false,
      entityType: false
    })

    const newData = {
      business_name: formData.legalName,
      dba: dbaRequired ? formData.legalName : formData.dba,
      use_legal_name: dbaRequired,
      tax_identifier_selected: data.taxType,
      tax_identifier: formData.taxId,
      business_entity_type: data.entityType,
      industry: data.industry,
      category: JSON.stringify(data.categories),
      product_lines: JSON.stringify(data.productLines),
      services: JSON.stringify(data.services),
      attributes: JSON.stringify(data.attributes)
    }

    let form = new FormData()
    for (let key in newData) {
      createFormData(form, key, newData[key])
    }

    setLoading(true)

    if (!data.id) {
      if (data.logo?.file) {
        form = await makingBlobFormData(form, 'logo', data.logo)
      }
      form = await makingBlobFormData(form, 'business_licence', data.businessLicense)
      form = await makingBlobFormData(form, 'dealer_network_agreement', data.dealerNetworkAgreement)
    }

    axios({
      url: `companies/${data.id ? data.id + '/' : ''}`,
      method: data.id ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: form
    })
      .then(response => {
        const { data: respData, status } = response
        if ((status === 200 || status === 201) && respData && respData.id) {
          if (!data.id) {
            dispatch(switchAccountCompany(respData))
          }
          navigate(nextStep)
        }
      })
      .catch(error => {
        const {
          data: { message },
          status
        } = error.response

        if (status === 400) {
          console.log('[API POST /companies] error = ', message)
          setError(error)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      {loading && <Loader />}
      <BrandCompanyForm
        data={data}
        userType={auth?.user?.initial_account_type}
        dbaRequired={dbaRequired}
        setDbaRequired={setDbaRequired}
        onSubmit={onSubmit}
        error={error}
        loading={loading}
        onChange={handleChange}
        setShowErrors={setShowErrors}
        showErrors={showErrors}
        showUploadModal={showUploadModal}
        setShowUploadModal={setShowUploadModal}
        setProfileAvatar={updateProfileAvatar}
        updateCroppedAreaPixels={updateCroppedAreaPixels}
      />
    </>
  )
}
