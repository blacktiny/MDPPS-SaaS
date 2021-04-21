export interface Props {
  profile_visibility?: 'everyone' | 'private'
  message_visibility?: 'everyone' | 'connections' | 'no'
}

const PrivacyAndSecuritySettings = [
  {
    header: 'Profile Visibility',
    description: 'Manage who can see your activity and connections.',
    optionName: 'profile_visibility',
    optionValues: [
      { value: 'everyone', label: 'Everyone' },
      { value: 'private', label: 'My Connections' }
    ]
  },
  {
    header: 'Messages',
    description: 'Manage who can send you messages.',
    optionName: 'message_visibility',
    optionValues: [
      { value: 'everyone', label: 'Everyone' },
      { value: 'connections', label: 'My Connections' },
      { value: 'no', label: 'No One' }
    ]
  }
]

export default PrivacyAndSecuritySettings
