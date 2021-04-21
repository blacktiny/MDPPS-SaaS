export interface Actor {
  first_name: string
  last_name: string
  profile_photo: string
  url: string
}

export default interface Notification {
  actor: Actor
  created: string
  description: string
  is_read: boolean
  level: string
  title: string
  url: string
  id: number
}
