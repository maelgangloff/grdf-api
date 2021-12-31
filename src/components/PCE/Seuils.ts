export interface Seuils {
  id: number | null
  idSouscriptionAssocier: number | null
  frequence: 'Annuel' | 'Mensuel' | 'Journalier'
  pce: string | null
  pourcentage?: number
  notification: {
    mail: boolean
    sms: boolean
    notifierAvantSeuil: boolean
    notifierApresSeuil: boolean
    dateDebut: string | number
    dateFin: string | number
    modeNotifReceived?: string | null
  }
  seuils: Array<{
    valeur: number
    mois: number
    annee: number
  }>
}

export interface SeuilsCreated {
  id: number
  idSouscriptionAssocier: number
}
