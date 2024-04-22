/* eslint-disable camelcase */
export interface UserInfoDetails {
  id: number
  first_name: string
  last_name: string
  email: string
  rev: string
  sofit_id: string
  profile: string
  type: string
  status: string
  accept_be_contacted: string
  accept_collect_info: string
  accept_be_contacted_updated_at: string
  accept_collect_info_updated_at: string
  last_login: string
  activation_date: string
  updated_password: boolean
  numero_identification: string|null
  type_structure: string|null
  created_at: string
  updated_at: string
  espace: {
    id: number
    mobile_phone: string
    validated_mobile_phone: string|null
    mobile_phone_expiration_date: string|null
    notification_info_coupure_sms: boolean|null
    notification_info_coupure_email: boolean|null
    home_phone: string
    adresse: {
      departement: number
      id: number
      nom_voie: string
      complement: string
      code_postal: string
      ville: string
    }
  }
}
