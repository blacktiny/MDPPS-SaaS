const header = {
  data1: 'Account Activity',
  data2: 'Email',
  data3: 'SMS'
}

const customCellClass = {
  data1: 'col-md-8',
  data2: 'col-md-2 text-right',
  data3: 'col-md-2 text-right'
}

const cellData = [
  {
    data1: {
      type: 'title_with_description',
      topic: 'New Browser',
      subtopic: 'A new browser is used to sign in.'
    },
    data2: { type: 'checkbox', name: 'account_activity_new_browser_email' },

    data3: { type: 'checkbox', name: 'account_activity_new_browser_sms' }
  },
  {
    data1: {
      type: 'title_with_description',
      topic: 'New Device',
      subtopic: 'A new device is linked.'
    },
    data2: { type: 'checkbox', name: 'account_activity_new_device_email' },
    data3: { type: 'checkbox', name: 'account_activity_new_device_sms' }
  },
  {
    data1: {
      type: 'title_with_description',
      topic: 'New App',
      subtopic: ' A new app is connected.'
    },
    data2: { type: 'checkbox', name: 'account_activity_new_app_email' },
    data3: { type: 'checkbox', name: 'account_activity_new_app_sms' }
  }
]

const allAvailableEmailOptions = [
  'account_activity_new_browser_email',
  'account_activity_new_device_email',
  'account_activity_new_app_email'
]

const allAvailableSMSOptions = [
  'account_activity_new_browser_sms',
  'account_activity_new_device_sms',
  'account_activity_new_app_sms'
]

const allAvailableOptions = [
  ...allAvailableEmailOptions,
  ...allAvailableSMSOptions
]

export default {
  header,
  cellData,
  allAvailableOptions,
  customCellClass,
  allAvailableSMSOptions
}
