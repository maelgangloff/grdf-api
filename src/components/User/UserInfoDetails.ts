export interface UserInfoDetails {
  id: number
  first_name: string
  last_name: string
  email: string
  rev: string
  sofit_id: string
  type: string
  espace: {
    id: number
    discr: string
    mobile_phone: string
    home_phone: string
    adresse: {
      id: number
      nom_voie: string
      code_postal: string
      ville: string
    }
  }
}
