/* eslint-disable camelcase */
export interface Accreditation {
  id_accreditation: string
  id_internaute: string
  type_objet: string
  id_objet: string
  role: string
  delai_avant_archivage: string
  parametres_enrichissement: {
    DATEFINPERIODE: string|null
    CODEPOSTAL: string
    DL: string
    TELERELEVE: string
    RAISONSOCIALETITULAIRE: string
    STATUTCONTRAT: string
    DATEDEBUTPERIODE: string
    PCE: string
    NUMEROSERIE: string
    RAISONSOCIALEERRONEE: string
    MHS: string|null
    MES: string
    MATRICULECOMPTEUR: string
    TARIF: string
    NOMTITULAIRE: string
    NOMTITULAIREERRONE: string
    FREQUENCERELEVE: string
  }
  parametres_verification: {
    CODEPOSTAL: string
    DATEPREMIERACC?: string|null
    NOMTITULAIRE: string
  }
  donnees_techniques: {
    alias: string
    canal_creation: string|null
    application: string|null
    id_internaute_referentiel: string|null
    date_creation: string
    date_premiere_accreditation: string|null
    date_suppression: string|null
    date_activation: string|null
    date_derniere_modification: string|null
    date_derniere_verification: string
    date_propagation: string|null
    date_rafraichissement: string|null
    date_fin_validite: string|null
    etat: string
    date_revocation: string|null
    date_passage_a_obsolete: string|null
    origine_passage_a_obsolete: string|null
    source_passage_a_obsolete: string|null
    date_passage_a_refuse: string|null
    origine_passage_a_refuse: string|null
    source_passage_a_refuse: string|null
  }
  parametres_validation: string|null
  informations_complementaires: {
    POURACCRED_DENOMINATION: string
    ID_ESPACE_PERSO_ACCRED: string
    CODE_TYPE_RESIDENCE: string
    SEQ: string
  }|[]
  donnees_controle: string|null
}
