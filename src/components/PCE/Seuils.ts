export interface Seuils {
  /**
   * Identifiant du seuil
   */
  id: number
  idSouscriptionAssocier: number
  /**
   * Fréquence de mesure associé au seuil
   */
  frequence: 'Annuel' | 'Mensuel' | 'Journalier'
  /**
   * Numéro unique identifiant le Point de Comptage et d'Estimation
   */
  pce: string
  pourcentage?: number
  notification: {
    /**
     * Indique si le client a souhaité être averti du dépassement par courriel
     */
    mail: boolean
        /**
     * Indique si le client a souhaité être averti du dépassement par SMS
     */
    sms: boolean
    /**
     * Indique si le client a souhaité être averti avant le dépassement du seuil
     */
    notifierAvantSeuil: boolean
    /**
     * Indique si le client a souhaité être averti après le dépassement du seuil
     */
    notifierApresSeuil: boolean
    /**
     * Date de début de l'alerte
     */
    dateDebut: string | number
    /**
     * Date de fin de l'alerte
     */
    dateFin: string | number
    /**
     * Mode de notification de l'alerte
     */
    modeNotifReceived?: string | null
  }
  seuils: Array<{
    /**
     * Valeur du seuil en kWh
     */
    valeur: number
    /**
     * Mois du seuil
     */
    mois: number
    /**
     * Année du seuil
     */
    annee: number
  }>
}

export interface SeuilsCreated {
  id: number
  idSouscriptionAssocier: number
}
