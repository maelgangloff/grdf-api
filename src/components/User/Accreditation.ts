/* eslint-disable camelcase */
export interface Accreditation {
  /**
   * Identifiant de l'accréditation
   */
  id_accreditation: string
  /**
   * Identifiant de l'internaute
   */
  id_internaute: string
  /**
   * Type d'objet concerné par l'accréditation
   */
  type_objet: string
  /**
   * Identifiant de l'objet (le PCE dans le cas des compteurs)
   */
  id_objet: string
  /**
   * Rôle de l'utilisateur sur ce PCE
   * Si détenteur : `DETENTEUR_CONTRAT_FOURNITURE`
   */
  role: string
  /**
   * Délai avant l'archivage de l'accréditation
   */
  delai_avant_archivage: string
  parametres_enrichissement: {
    /**
     * Date de fin de validité
     */
    DATEFINPERIODE: string|null
    /**
     * Code postal
     */
    CODEPOSTAL: string
    DL: string
    /**
     * Indique si le compteur est télérelevé
     */
    TELERELEVE: 'Oui' | 'Non' | string
    /**
     * Raison sociale du titulaire
     */
    RAISONSOCIALETITULAIRE: string
    /**
     * Statut du contrat
     */
    STATUTCONTRAT: 'Actif' | 'Inactif' | string
    /**
     * Date de début
     */
    DATEDEBUTPERIODE: string
    /**
     * Numéro unique identifiant le Point de Comptage et d'Estimation
     */
    PCE: string
    /**
     * Numéro de série de l'équipement
     */
    NUMEROSERIE: string
    /**
     * Indique si la raison sociale comporte une erreur
     */
    RAISONSOCIALEERRONEE: 'true' | 'false'
    /**
     * Date de Mise Hors Service
     */
    MHS: string|null
    /**
     * Date de Mise En Service
     */
    MES: string|null
    /**
     * Matricule du compteur
     */
    MATRICULECOMPTEUR: string
    /**
     * Tarif du contrat
     * @see tarifAcheminement
     */
    TARIF: string
    /**
     * Nom du titulaire du contrat
     */
    NOMTITULAIRE: string
    /**
     * Indique si le nom du titulaire comporte une erreur
     */
    NOMTITULAIREERRONE: string
    /**
     * Fréquence contractuelle de la relève
     * @see frequenceReleve
     */
    FREQUENCERELEVE: string
  }
  parametres_verification: {
    /**
     * Code postal
     */
    CODEPOSTAL: string
    /**
     * Date de première accréditation sur le PCE
     */
    DATEPREMIERACC?: string|null
    /**
     * Nom du titulaire du contrat
     */
    NOMTITULAIRE: string
  }
  donnees_techniques: {
    /**
     * Identification du compteur choisi par le client
     */
    alias: string
    /**
     * Canal de création de l'acccréditation
     */
    canal_creation: string|null
    /**
     * Application utilisée
     */
    application: string|null
    /**
     * Identifiant de l'internaute
     */
    id_internaute_referentiel: string|null
    /**
     * Date de création de l'accréditation
     */
    date_creation: string
    /**
     * Date de première accréditation du compteur
     */
    date_premiere_accreditation: string|null
    /**
     * Date de suppression de l'accréditation
     */
    date_suppression: string|null
    /**
     * Date d'activation de l'accréditation
     */
    date_activation: string|null
    /**
     * Date de dernière modification de l'accréditation
     */
    date_derniere_modification: string|null
    /**
     * Date de dernière vérification de l'accréditation
     */
    date_derniere_verification: string
    /**
     * Date de propagation de l'accréditation
     */
    date_propagation: string|null
    /**
     * Date de rafraîchissement de l'accréditation
     */
    date_rafraichissement: string|null
    /**
     * Date de fin de validité de l'accréditation
     */
    date_fin_validite: string|null
    /**
     * Etat de l'accréditation
     */
    etat: 'Active' | 'Inactive' | string
    /**
     * Date de révocation de l'accréditation
     */
    date_revocation: string|null
    /**
     * Date de passage de l'accréditation à obsolète
     */
    date_passage_a_obsolete: string|null
    /**
     * Origine de passage de l'accréditation à obsolète
     */
    origine_passage_a_obsolete: string|null
    /**
     * Source de passage de l'accréditation à obsolète
     */
    source_passage_a_obsolete: string|null
    /**
     * Date de passage de l'accréditation à obsolète
     */
    date_passage_a_refuse: string|null
    /**
     * Origine de passage de l'accréditation à refusé
     */
    origine_passage_a_refuse: string|null
    /**
     * Source de passage de l'accréditation à refusé
     */
    source_passage_a_refuse: string|null
  }
  parametres_validation: object[]
  informations_complementaires: {
    /**
     * Signataire de l'autorisation d'accréditation
     */
    POURACCRED_DENOMINATION: string
    /**
     * Identifiant de l'espace client
     */
    ID_ESPACE_PERSO_ACCRED: string
    /**
     * Code d'identification du type de résidence
     */
    CODE_TYPE_RESIDENCE: string
    /**
     * Numéro de séquence de l'accréditation (pour le suivi)
     */
    SEQ: string
  }|[]
  donnees_controle: object[]
}
