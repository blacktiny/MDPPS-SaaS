import { RELATIONSHIP } from '../../constants/common'
import { ActiveCompany } from '../../shared/models/User'

interface EmployeeSingleForm {
  firstName: string
  lastName: string
  email: string
  [key: string]: string | number | boolean | string[] | object
}

export interface InviteEmployeeFormData {
  Employees: EmployeeSingleForm[]
  [key: string]: string | number | boolean | string[] | object
}

interface CompanySingleForm {
  to_company_business_name: string
  to_user_email: string
  to_company_contact: string
}
export interface InviteCompanyFormData {
  Companies: CompanySingleForm[]
}

interface ExtraDataArray {
  to_company_business_name: string
  to_company_contact: string
}

interface EmployeeDataArray {
  from_company: string
  from_user: string
  to_user_email: string
  to_relationship: string
}

type CompanyDataArray = EmployeeDataArray & ExtraDataArray
export const getInviteMultipleEmployeesReqData = (
  data: InviteEmployeeFormData,
  active_company: ActiveCompany,
  url: string
) => {
  const dataArray: EmployeeDataArray[] = []
  data.Employees.forEach(employee => {
    Object.keys(employee).forEach(key => {
      if (employee[key]) {
        dataArray.push({
          from_company: active_company?.url,
          from_user: url,
          to_user_email: employee[key] as string,
          to_relationship: RELATIONSHIP.EMPLOYEE
        })
      }
    })
  })

  return dataArray
}

export const getInviteMultipleCopmanyReqData = (
  data: InviteCompanyFormData,
  active_company: ActiveCompany,
  url: string,
  isHolding?: boolean
) => {
  const dataArray: CompanyDataArray[] = []
  data.Companies.forEach(company => {
    dataArray.push({
      from_company: active_company?.url,
      from_user: url,
      to_user_email: company.to_user_email,
      to_relationship: isHolding ? RELATIONSHIP.CHILD : RELATIONSHIP.PARENT,
      to_company_business_name: company.to_company_business_name,
      to_company_contact: company.to_company_contact
    })
  })
  return dataArray
}
