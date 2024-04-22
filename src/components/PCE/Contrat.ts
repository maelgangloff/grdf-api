export interface Contrat {
  tarifAcheminement: string
  carActuelle: number
  carFuture: number
  profilTypeFutur: string
  cja: string|null
  cjaMensuelle: string|null
  cjaJournaliere: string|null
  idCad: string
  nomTitulaire: string
  raisonSocialeTitulaire: string|null
  numeroSiretTitulaire: string|null
  dateMes: string|null
  dateMhs: string|null
  statutContractuel: string
  consommationJournalierePlafond: string|null
  modulationN1: string|null
  modulationN2: string|null
  modulationN3: string|null
  modulationN4: string|null
  assiette: string|null
  fournisseur: string
  profil: string
  dateDebutProfil: string
  dateFinProfil: string
}
