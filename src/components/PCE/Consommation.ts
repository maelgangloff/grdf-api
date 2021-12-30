export enum ConsommationType {
  informatives = 'informatives',
  publiees = 'publiees'
}

export interface Consommation {
  [pce: string]: {
    idPce: string
    releves: Array<{
      dateDebutReleve: string
      dateFinReleve: string
      journeeGaziere: string | null
      indexDebut: number
      indexFin: number
      volumeBrutConsomme: number
      energieConsomme: number
      pcs: any
      volumeConverti: number|null
      pta: any
      natureReleve: 'Publiée' | 'Informative Journalier' | string
      qualificationReleve: 'Estimé' | 'Mesuré' | 'Absence de Données' | string
      status: any
      coeffConversion: number
      frequenceReleve: any
      temperature: any
    }>
    frequence: any
  }
}
