export interface DonneesEnrichissement1 {
  accessibilite: string
  Compteur: {
    matricule: string
    code: string
    nombreRoues: number
    debit: string
    situation: string
  }
  pressionAlimentation: string
  natureDuGaz: string
  Branchement: {
    type: string
    etat: string
    robinetGaz: string
  }
  dateDemarageContrat: string
  typeEmetteurGazpar: {
    code: string
    libelle: string
  }
  tigeCuisine: string
  avertissementLibre: string
  source: string
}

export interface DonneesEnrichissement2 {
  identifiantPCE: string
  statutContrat: string
  numeroCompteContrat: string
  nomClient: string
  segmentClient: string
  releve: {
    frequence: string
    etatTeleReleve: {
      codeEtat: string
      etat: string
    }
  }
  tarifAcheminement: string
  regimeProprietes: {
    compteur: string
  }
  fournisseur: {
    nom: string
    identifiantCAD: string
  }
  CAR_Actuelle: {
    valeur: number
    type: string
  }
  ProfilActuel: {
    valeur: string
    dateDebut: string
    dateFin: string
  }
  CAR_Future: {
    valeur: number
    type: string
  }
  ProfilFutur: {
    valeur: string
  }
  PITD: {
    identifiant: string
    libelle: string
  }
  CLD: {
    numeroSAP: string
  }
  identifiantPDLA: string
  dateSituationContractuellePCE: {
    datePremiereMES: string
    dateDerniereMES: string
  }
  partenaireDO: {
    nom: string
  }
  partenairePayeur: {
    nom: string
  }
  source: string
}

export interface DonneesEnrichissement3 {
  diagnosticQualite: boolean
  source: string
}
