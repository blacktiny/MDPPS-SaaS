import { monthNames } from 'constants/monthNames'
import { STEPS } from 'pages/Onboarding/Brands/Steps'

export const localStringToNumber = s => {
  return Number(String(s).replace(/[^0-9.]+/g, ''))
}

export const deepObjectMerge = (destination, source) => {
  const newDestination = { ...destination }
  const newSource = { ...source }

  for (const property in newSource) {
    if (typeof newSource[property] === 'object' && newSource[property] !== null) {
      newDestination[property] = {
        ...newDestination[property],
        ...newSource[property]
      }
    } else {
      newDestination[property] = newSource[property]
    }
  }

  return newDestination
}

export const getMonthName = (monthNum, months = monthNames.en) => {
  let monthName = ''

  if (months[monthNum - 1]) {
    monthName = months[monthNum - 1]
  }

  return monthName
}

export const getWordNumEnding = (iNumber, aEndings = ['day', 'days', 'days']) => {
  let sEnding, i // 1 day 4 days 5 days

  iNumber = Number(iNumber) % 100

  if (iNumber >= 11 && iNumber <= 19) {
    sEnding = aEndings[2]
  } else {
    i = iNumber % 10

    switch (i) {
      case 1:
        sEnding = aEndings[0]
        break
      case 2:
      case 3:
      case 4:
        sEnding = aEndings[1]
        break
      default:
        sEnding = aEndings[2]
    }
  }

  return sEnding
}

export const createFormData = (formData, key, data) => {
  if (data === Object(data) || Array.isArray(data)) {
    for (var i in data) {
      createFormData(formData, key + '[' + i + ']', data[i])
    }
  } else {
    formData.append(key, data)
  }
}

export const capitalize = str => {
  if (typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 *   Generate Geo Pattern
 */
export const GeoPatternTypes = [
  'overlapping_circles',
  'chevrons',
  'octagons',
  'plus_signs',
  'xes',
  'sine_waves',
  'hexagons',
  'overlapping_rings',
  'plaid',
  'triangles',
  'squares',
  'nested_squares',
  'mosaic_squares',
  'concentric_circles',
  'diamonds',
  'tessellation'
]

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max))
}

export const generateGeoPattern = (type = '') => {
  const GeoPattern = require('geopattern')
  const patternType = type ? type : GeoPatternTypes[getRandomInt(16)]
  const pattern = GeoPattern.generate(type, {
    patterns: [patternType]
  })

  return {
    type: patternType,
    Uri: pattern.toDataUri()
  }
}

/**
 *   Get step number according account type and step name
 */
export const getActiveStep = (user, stepName) => {
  if (user) {
    switch (user.initial_account_type) {
      case 'customer':
        if (stepName === 'address') return 2
        if (stepName === 'finish') return 3
        break
      case 'employee':
        if (stepName === 'finish') return 3
        break
      default:
        if (stepName === 'address') return 3
        break
    }
  }

  return 0
}

/**
 *   Get onboarding steps according to account type
 */
export const getOnboardingSteps = user => {
  const tmpSTEPS = JSON.parse(JSON.stringify(STEPS))

  if (user) {
    switch (user.initial_account_type) {
      case 'customer':
        tmpSTEPS.splice(2, 1) // remove company
        tmpSTEPS.splice(3, 1) // remove team-members
        return tmpSTEPS
      case 'employee':
        tmpSTEPS.splice(3, 1) // remove company
        tmpSTEPS.splice(3, 1) // remove team-members
        return tmpSTEPS
      default:
        return tmpSTEPS
    }
  }

  return tmpSTEPS
}

/**
 *   Add image to form data
 */
export const addImage2Form = async (field, name, image, form, crop = null) => {
  let blobOrigin = image ? await fetch(image).then(r => r.blob()) : null
  if (blobOrigin) {
    var originFile = new File([blobOrigin], name, {
      type: 'image/png',
      lastModified: new Date().getTime()
    })

    if (name === 'cover.png') {
      form.append('profile_cover', originFile, name)
      form.append('profile_cover_crop', JSON.stringify(crop))
    } else {
      form.append(field, originFile, name)
      form.append('crop', JSON.stringify(crop))
    }
  } else {
    if (name === 'cover.png') {
      form.append('profile_cover', new File([''], ''))
      form.append('profile_cover_crop', null)
    } else {
      form.append(field, new File([''], ''))
      form.append('crop', null)
    }
  }

  return form
}

/**
 *   Check if string contains a number
 */
export const hasNumber = myString => {
  return /\d/.test(myString)
}

/**
 *   Check if string contains an uppercase
 */
export const hasUppercase = myString => {
  var i = myString.length
  while (i--) {
    if (myString.charAt(i) === myString.charAt(i).toUpperCase()) return true
  }

  return false
}
