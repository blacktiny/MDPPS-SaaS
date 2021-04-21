const header = {
  data1: 'My Network',
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
      topic: 'Someone Mentions Me',
      subtopic: 'When someone mentions my name on the Dealer Link network.'
    },
    data2: { type: 'checkbox', name: 'my_network_someone_mentions_me_email' },

    data3: { type: 'checkbox', name: 'my_network_someone_mentions_me_sms' }
  },
  {
    data1: {
      type: 'title_with_description',
      topic: 'Someone Follows Me',
      subtopic: 'When someone follows me on the Dealer Link network.'
    },
    data2: { type: 'checkbox', name: 'my_network_someone_follows_me_email' },
    data3: { type: 'checkbox', name: 'my_network_someone_follows_me_sms' }
  },
  {
    data1: {
      type: 'title_with_description',
      topic: 'Someone Replies to Me',
      subtopic: 'When someone responds to my posts on the Dealer Link network.'
    },
    data2: { type: 'checkbox', name: 'my_network_someone_replies_to_me_email' },
    data3: { type: 'checkbox', name: 'my_network_someone_replies_to_me_sms' }
  }
]

const allAvailableEmailOptions = [
  'my_network_someone_mentions_me_email',
  'my_network_someone_follows_me_email',
  'my_network_someone_replies_to_me_email'
]

const allAvailableSMSOptions = [
  'my_network_someone_mentions_me_sms',
  'my_network_someone_follows_me_sms',
  'my_network_someone_replies_to_me_sms'
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
