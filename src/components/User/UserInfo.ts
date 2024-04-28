/* eslint-disable camelcase */
export interface UserInfo {
  id: number
  type: string
  /**
   * Prénom
   */
  first_name: string
  /**
   * Nom de famille
   */
  last_name: string
  /**
   * Adresse courriel
   */
  email: string
  /**
   * Identification de l'utilisateur dans la base des utilisateurs
   */
  sofit_id: string
  /**
   * Type de profil du client
   */
  profile: 'particulier' | string
  espace: {
    id: number
    /**
     * Numéro de téléphone mobile
     */
    mobile_phone: string
    /**
     * Numéro de téléphone mobile validé
     */
    validated_mobile_phone: string|null
    /**
     * Date d'expiration du numéro de téléphone mobile
     */
    mobile_phone_expiration_date: string|null
    /**
     * Numéro de téléphone du domicile
     */
    home_phone: string
    /**
     * Indique si l'usager demande à être informé d'une coupure de gaz par SMS
     */
    notification_info_coupure_sms: boolean
    /**
     * Indique si l'usager demande à être informé d'une coupure de gaz par courriel
     */
    notification_info_coupure_email: boolean
    adresse: {
      id: number
      /**
       * Numéro et nom de la voie
       */
      nom_voie: string | null
      /**
       * Complément d'adresse
       */
      complement: string | null
      /**
       * Code postal
       */
      code_postal: string | null
      /**
       * Ville
       */
      ville: string | null

      /**
       * Numéro du département
       */
      departement: number|null
    }
  }
  rev: string|null
  /**
   * Indique si le compte est actif
   */
  status: string|null
  /**
   * Indique si le client souhaite être contacté
   */
  accept_be_contacted: string
  /**
   * Indique si le client a accepté la collecte d'information
   */
  accept_collect_info: string
  /**
   * Date de dernière mise à jour du consentement concernant le souhait d'être contacté
   */
  accept_be_contacted_updated_at: string
  /**
   * * Date de dernière mise à jour du consentement concernant la collecte d'information
   */
  accept_collect_info_updated_at: string
  /**
   * Date de dernière connexion
   */
  last_login: string

  /**
   * Date d'activation de l'utilisateur
   */
  activation_date: string

  /**
   * Indique si l'utilisateur a mis à jour son mot de passe
   */
  updated_password: boolean

  /**
   * Numéro d'identification de la structure
   */
  numero_identification: string|null
  /**
   * Type de structure
   */
  type_structure: string|null
  /**
   * Date de création de l'utilisateur
   */
  created_at: string
  /**
   * Date de dernière mise à jour de l'utilisateur
   */
  updated_at: string
}
