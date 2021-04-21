import { Address } from 'cluster'

export interface ActiveCompany {
  id: number
  url: string
  role?: string
  business_name: string
  microsite_name: string
  permissions: string[]
  user_permission: UserPermission
  is_subscribed: boolean
  status: 'active' | 'pending_review' | 'deactive' | 'denied'
  is_active: boolean
  logo: {
    file_cropped: string
  }
  is_trial?: boolean
}

export interface UserPermission {
  active: boolean
  company: string
  designation: string
  user: string
}

export interface CropData {
  x: number
  y: number
  width: number
  height: number
}
export interface User {
  url?: string
  crop?: string
  first_name?: string
  last_name?: string
  email?: string
  bio?: string
  job_company?: string
  job_title?: string
  profile_cover?: {
    file: string
    file_cropped: string
    crop: CropData
    caption?: string
  }
  profile_photo?: {
    file: string
    file_cropped: string
    crop: CropData
    caption?: string
  }
  geo_pattern?: string
  office_phone_number?: string
  mobile_phone_number?: string
  active_company?: ActiveCompany
  companies?: ActiveCompany[]
  active_adress?: number
  active_address?: string
  address1?: string
  address2?: string
  city?: string
  state?: string
  country?: string
  zip_code?: string
  location?: string
  date_joined?: string
  account_type?: string
  initial_account_type?: string
  type_company?: string
  is_freezed?: boolean
  is_disabled?: boolean
  permissions?: string[]
  timezone?: string
  currency?: string
  language?: string
  is_onboarding_complete?: boolean
  brands_own?: string[]
  products_own?: string[]
  profile_visibility?: 'everyone' | 'private'
  message_visibility?: 'everyone' | 'connections' | 'no'
  account_activity_new_browser_email?: boolean
  account_activity_new_device_email?: boolean
  account_activity_new_app_email?: boolean
  my_network_someone_mentions_me_email?: boolean
  my_network_someone_follows_me_email?: boolean
  my_network_someone_replies_to_me_email?: boolean
  marketing_company_news_email?: boolean
  marketing_weekly_email?: boolean
  marketing_latest_news_email?: boolean
  account_activity_new_browser_sms?: boolean
  account_activity_new_device_sms?: boolean
  account_activity_new_app_sms?: boolean
  my_network_someone_mentions_me_sms?: boolean
  my_network_someone_follows_me_sms?: boolean
  my_network_someone_replies_to_me_sms?: boolean
  marketing_company_news_sms?: boolean
  marketing_weekly_sms?: boolean
  marketing_latest_news_sms?: boolean
  sms_notification?: boolean
  email_confirmed?: boolean
  date_birth?: string
  username?: string
  [key: string]: string | number | boolean | string[] | object | Address
}

export interface Invite {
  type: 'connect' | 'access_request' | 'access_granted' | 'verification' | 'adn'
  destination_object?: string
  destination_email?: string
  extra_data?: {
    first_name?: string
    last_name?: string
  }
}
