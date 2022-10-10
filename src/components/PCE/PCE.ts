import {
  DonneesEnrichissement1,
  DonneesEnrichissement2,
  DonneesEnrichissement3
} from './DonneesEnrichissement'
import { Contrat } from './Contrat'

export interface PCE {
  idObject: string
  typeObject: string
  role: string
  alias: string
  teleReleve: string
  pce: string
  dateActivation: string
  mhs: string
  numeroSerie?: string
  numeroMatricule?: string
  frequenceReleve: '6M' | '1M' | 'MM' | 'JJ'
  etat: string
  datePremiereAccreditation: string
  nomTitulaire: string
  donneesEnrichissement?: [[DonneesEnrichissement1], [DonneesEnrichissement2, DonneesEnrichissement3]]
  mes: string
  adresse: {
    numVoie: string
    nomVoie: string
    codePostal: string
    localite: object | null
    complement: string
    fullAddress?: string
  }
  donneeTechnique: {
    calibre: string | object | null
    nombreRoues: number
    debit: string
    pressionAval: string | object | null
    matricule: string
    code: string
  } | null
  contrat: Contrat | null
  codePostal: string
  dateDerniereVerification: string
}
