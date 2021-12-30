export interface Contrat {
  tarifAcheminement: string
  fournisseur: string
  car: number
  idPitd: string
  libellePitd: string
  profil: string
  dateDebutProfil: string
  dateFinProfil: string
  proprieteCompteur: string
  convertisseur: string | null
  detendeur: string | null
  enregistreur: string | null
  missionInteretGeneral: string|null
}
