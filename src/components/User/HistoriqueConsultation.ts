export interface HistoriqueConsultationRequest {
  numPce: string
  isResponseAll: boolean
}

export interface HistoriqueConsultation extends HistoriqueConsultationRequest {
  id: number
}
