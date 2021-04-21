const header = {
  data1: 'Latest News',
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
      topic: 'Company News',
      subtopic: 'Get our platform news, announcements, and product updates.'
    },
    data2: { type: 'checkbox', name: 'marketing_company_news_email' },

    data3: { type: 'checkbox', name: 'marketing_company_news_sms' }
  },
  {
    data1: {
      type: 'title_with_description',
      topic: 'Replay',
      subtopic:
        'A weekly email featuring top comments on your Dealer Link network.'
    },
    data2: { type: 'checkbox', name: 'marketing_weekly_email' },
    data3: { type: 'checkbox', name: 'marketing_weekly_sms' }
  },
  {
    data1: {
      type: 'title_with_description',
      topic: 'Latest News',
      subtopic: 'A weekly email featuring the latest stories from our blog.'
    },
    data2: { type: 'checkbox', name: 'marketing_latest_news_email' },
    data3: { type: 'checkbox', name: 'marketing_latest_news_sms' }
  }
]

const allAvailableEmailOptions = [
  'marketing_company_news_email',
  'marketing_weekly_email',
  'marketing_latest_news_email'
]

const allAvailableSMSOptions = [
  'marketing_company_news_sms',
  'marketing_weekly_sms',
  'marketing_latest_news_sms'
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
