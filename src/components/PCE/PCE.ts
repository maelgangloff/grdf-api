import {
  DonneesEnrichissement1,
  DonneesEnrichissement2,
  DonneesEnrichissement3
} from './DonneesEnrichissement'
import { Contrat } from './Contrat'

export interface PCE {
  idObject: string
  role: string
  /**
   * Identification du compteur choisi par le client
   */
  alias: string
  teleReleve: boolean
  /**
   * Point de Comptage et d'Estimation (identification du compteur)
   */
  pce: string
  dateActivation: string
  dateMhs: string|null
  dateMes: string|null
  codePostal: string
  frequenceJJ?: boolean
  frequence1M?: boolean
  frequenceMM?: boolean
  frequence6M?: boolean
  frequenceMMOrJJ?: boolean
  numeroSerie?: string
  numeroMatricule?: string
  /**
   * Il existe plusieurs fréquences de relève pour les compteurs :
   * - 6M : Relevé semestriel par un technicien GRDF
   * - 1M : Relevé mensuel
   * - MM : Relevé mensuel des clients « haut de portefeuille »
   * - JJ : Relevé journalier des plus gros clients « haut de portefeuille »
   */
  frequenceReleve: '6M' | '1M' | 'MM' | 'JJ'
  etat: string
  datePremiereAccreditation: string
  nomTitulaire: string
  donneesEnrichissement?: [[DonneesEnrichissement1], [DonneesEnrichissement2, DonneesEnrichissement3]]
  details: {
    technique: {
      calibre: string | null
      numeroMatricule: string
      codeDebit: string
      frequence: string
      idPitd: string
      /**
       * PITD : Point d’Interface Transport et Distribution
       */
      libellePitd: string
      clientSensibleMig: string
      proprieteCompteur: string
      proprieteDetendeur: string|null
      convertisseur: string|null
      proprieteEnregistreur: string|null
      roues: number
      debit: string
      /**
       * La pression de livraison du gaz en bar
       */
      pressionAval: string | null

      numeroRue: string|null,
      nomRue: string|null,
      complementAdresse: string|null,
      codePostal: string|null,
      codeInseeCommune: string|null,
      commune: string|null,

      situationCompteur: string|null,
      accessibiliteCompteur: string|null,
      reperageRobinetGaz: string|null,
      numeroSerie: string|null,
      etatCompteur: string|null,
      codeEtatTechniquePce: string|null,
      libelleEtatTechniquePce: string|null,
      telereleve: boolean,
      codeEtatCommunication: string|null,
      libelleEtatCommunication: string|null,
      codeNatureGaz: string|null,
      libelleNatureGaz: string|null
    } | null
    contrat: Contrat | null
    statutRestitutionTechnique: string|null
    statutRestitutionContrat: string|null
  } | null
  fullAddress?: string
  dateDerniereVerification: string
}
