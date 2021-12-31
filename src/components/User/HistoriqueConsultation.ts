export interface HistoriqueConsultation {
  id: number
  numPce: string
  updatedAt: string
}

export interface HistoriqueConsultationRequest {
  numPce: string
  isResponseAll: boolean
}
