/**
 * Les données publiées sont envoyées au fournisseur et permettent la facturation.
 * Les données informatives sont journalières et individuelles (seulement pour les compteurs 1M et MM).
 */
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
      /**
       * Pouvoir Calorifique Supérieur du Gaz.
       * Il s'agit de la « quantité d'énergie dégagée par la combustion complète d'une unité de combustible, la vapeur d'eau étant supposée condensée et la chaleur récupérée ».
       */
      pcs: any
      /**
       * Volume de gaz consommé sur la période en conditions normales, c'est à dire sous une pression de 1 bar et une température de 0°C.
       */
      volumeConverti: number|null
      /**
       * Coefficient lié aux conditions de température, pression et altitude au moment du relevé
       */
      pta: any
      natureReleve: 'Publiée' | 'Informative Journalier' | string
      qualificationReleve: 'Estimé' | 'Mesuré' | 'Absence de Données' | string
      status: any
      /**
       * Coefficient produit du PTA et du PCS, calculé suivant la valeur moyenne sur la période de consommation.
       */
      coeffConversion: number
      frequenceReleve: any
      temperature: any
    }>
    frequence: any
  }
}
