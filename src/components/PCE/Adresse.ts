export interface Adresse {
  adresse: {
    adressePostale: {
      complementLocal: {
        batiment: string
      }
      numVoie: string
      nomVoie: string
      codePostal: string
      localite: {
        codeINSEELocalite: string
        libelleLocalite: string
      }
    }
  }
  source: string
}
