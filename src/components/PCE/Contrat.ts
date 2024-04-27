export interface Contrat {
  /**
   * - T1 : CAR < 6 MWh
   * - T2 : CAR < 300 MWh
   * - T3 : CAR < 5 GWh
   * - T4 : CAR > 5 GWh
   */
  tarifAcheminement: string
  /**
   * CAR : Consommation Annuelle de Référence.
   * Il s'agit de l'estimation de la consommation annuelle de gaz naturel en kWh, pour un PCE, dans des conditions climatiques moyennes.
   */
  carActuelle: number
  carFuture: number
  profilTypeFutur: string
  /**
   * CJA : Capacité Journalière d’Acheminement.
   * Il s'agit de la quantité maximale d'énergie que le Distributeur s'engage à acheminer chaque Jour en un Point de Livraison
   */
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
  /**
   * La répartition de la part hiver (PH) dans la consommation annuelle (du 01/11 au 31/03)
   * - P011 : CAR < 6 MWh
   * - P012 : CAR > 6 MWh
   * - P013 : PH < 39%
   * - P014 : PH < 50%
   * - P015 : PH < 58%
   * - P016 : PH < 69%
   * - P017 : PH < 75%
   * - P018 : PH < 81%
   * - P019 : PH > 81%
   */
  profil: string
  dateDebutProfil: string
  dateFinProfil: string
}
