export interface ConsommationReference {
  id: number
  consommationType: string
  profile: string
  tranche: {
    id: number
    name: string
    min: number
    max: number
    createdAt: string
    updatedAt: string
    __initializer__: null
    __cloner__: null
    __isInitialized__: boolean
  }
  stationMeteo: {
    code: string
    createdAt: string
    updatedAt: string
    __initializer__: null
    __cloner__: null
    __isInitialized__: boolean
  }
  annee: number
  mois1: string
  mois2: string
  mois3: string
  mois4: string
  mois5: string
  mois6: string
  mois7: string
  mois8: string
  mois9: string
  mois10: string
  mois11: string
  mois12: string
  createdAt: string
  updatedAt: string
}
