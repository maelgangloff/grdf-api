import { Contrat } from './Contrat'

export interface PCE {
  idObject: string
  /**
   * Rôle de l'utilisateur sur ce PCE
   * Si détenteur : `DETENTEUR_CONTRAT_FOURNITURE`
   */
  role: string
  /**
   * Identification du compteur choisi par le client
   */
  alias: string
  /**
   * Indique si le compteur est télérelevé
   */
  teleReleve: boolean
  /**
   * Numéro unique identifiant le Point de Comptage et d'Estimation
   */
  pce: string
  /**
   * Date d'activation du PCE
   */
  dateActivation: string
  /**
   * Date de la Mise Hors Service (MHS) du PCE correspondante au titulaire actif
   */
  dateMhs: string|null
  /**
   * Date de la Mise En Service (MES) du PCE correspondante au titulaire actif
   */
  dateMes: string|null
  /**
   * Code postal rattaché au PCE
   */
  codePostal: string
  /**
   * JJ : Relevé journalier des plus gros clients « haut de portefeuille »
   */
  frequenceJJ?: boolean
  /**
   * 1M : Relevé mensuel
   */
  frequence1M?: boolean
  /**
   * MM : Relevé mensuel des clients « haut de portefeuille »
   */
  frequenceMM?: boolean
  /**
   * 6M : Relevé semestriel par un technicien GRDF
   */
  frequence6M?: boolean
  /**
   * Relevé mensuel des clients « haut de portefeuille » OU Relevé journalier des plus gros clients « haut de portefeuille »
   */
  frequenceMMOrJJ?: boolean
  /**
   * Numéro de série de l'équipement
   */
  numeroSerie?: string
  /**
   * Numéro de matricule du compteur
   */
  numeroMatricule?: string
  /**
   * Il existe plusieurs fréquences de relève pour les compteurs :
   * - 6M : Relevé semestriel par un technicien GRDF
   * - 1M : Relevé mensuel
   * - MM : Relevé mensuel des clients « haut de portefeuille »
   * - JJ : Relevé journalier des plus gros clients « haut de portefeuille »
   */
  frequenceReleve: '6M' | '1M' | 'MM' | 'JJ'
  /**
   * Etat du PCE
   */
  etat: 'Active' | 'Inactive' | string
  /**
   * Date de la première accréditation sur le PCE
   */
  datePremiereAccreditation: string
  /**
   * Nom du titulaire du contrat
   */
  nomTitulaire: string
  details: {
    technique: {
      /**
       * Calibre du compteur. Composé de la lettre G suivi d’un nombre qui représente le débit maximal du compteur de calibre immédiatement inférieur
       */
      calibre: string | null
      /**
       * Numéro de matricule du compteur
       */
      numeroMatricule: string
      /**
       * Débit du compteur en m3/h
       */
      codeDebit: string
      /**
       * Fréquence de relève associée au PCE
       */
      frequence: string
      /**
       * Identifiant du Point d'Interface Transport Distribution auquel le PCE est rattaché
       */
      idPitd: string
      /**
       * Nom du Point d'Interface Transport Distribution auquel le PCE est rattaché
       */
      libellePitd: string
      /**
       * Client non domestique assurant une mission d’intérêt général
       */
      clientSensibleMig: string
      /**
       * Régime de propriété du compteur
       */
      proprieteCompteur: string
      /**
       * Régime de propriété du détendeur
       */
      proprieteDetendeur: string|null
      /**
       * Régime de propriété du convertisseur
       */
      convertisseur: string|null
      /**
       * Régime de propriété de l'enregistreur
       */
      proprieteEnregistreur: string|null
      /**
       * Nombre de roues du compteur
       */
      roues: number
      /**
       * Débit technique du compteur
       */
      debit: string
      /**
       * Pression relative du Gaz au Point de Livraison en bar
       */
      pressionAval: string | null

      /**
       * Numéro de rue rattaché au PCE
       */
      numeroRue: string|null,
      /**
       * Nom de rue rattaché au PCE
       */
      nomRue: string|null,
      /**
       * Complément d'adresse rattaché au PCE
       */
      complementAdresse: string|null,
      /**
       * Code postal rattaché au PCE
       */
      codePostal: string|null,
      /**
       * Code INSEE de la commune rattachée au PCE
       */
      codeInseeCommune: string|null,
      /**
       * Commune (ou commune absorbante) rattachée au PCE
       */
      commune: string|null,
      /**
       * Code de situation du compteur dans l'habitation
       */
      situationCompteur: string|null,
      /**
       * Indique si le compteur est facilement accessible
       */
      accessibiliteCompteur: string|null,

      reperageRobinetGaz: string|null,
      /**
       * Numéro de série de l'équipement
       */
      numeroSerie: string|null,
      etatCompteur: string|null,
      /**
       * Code d'état technique
       * - 1 : Productif
       */
      codeEtatTechniquePce: string|null,
      /**
       * Libellé du code d'état technique
       */
      libelleEtatTechniquePce: string|null,
      /**
       * Indique si le compteur est télérelevé
       */
      telereleve: boolean,
      /**
       * Code d'état de la communication
       * - 3 : Télérelevé
       */
      codeEtatCommunication: string|null,
      /**
       * Libellé du code d'état de communication
       */
      libelleEtatCommunication: string|null,
      /**
       * Code d'identification du type de gaz livré
       */
      codeNatureGaz: string|null,
      /**
       * Nom générique du type de gaz livré
       */
      libelleNatureGaz: string|null
    } | null
    contrat: Contrat | null
    statutRestitutionTechnique: string|null
    statutRestitutionContrat: string|null
  } | null
  /**
   * Adresse postale complète du lieu où se situe le PCE
   */
  fullAddress?: string
  /**
   * Date de dernière vérification des informations
   */
  dateDerniereVerification: string
}
