export interface UserInfo {
  id: number
  type: string
  first_name: string
  last_name: string
  email: string
  sofit_id: string
  profile: string
  espace: {
    id: number
    mobile_phone: string
    validated_mobile_phone: any
    mobile_phone_expiration_date: any
    home_phone: string
    notification_info_coupure_sms: boolean
    notification_info_coupure_email: boolean
    adresse: {
      id: number
      nom_voie: string | null
      complement: string | null
      code_postal: string | null
      ville: string | null
    }
  }
  rev: string|null
  status: string|null
  accept_be_contacted: string
  accept_collect_info: string
  accept_be_contacted_updated_at: string
  accept_collect_info_updated_at: string
  last_login: string
  created_at: string
  updated_at: string
}
