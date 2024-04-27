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
       * PCS : Pouvoir Calorifique Supérieur du Gaz.
       * Il s'agit de la « quantité d'énergie dégagée par la combustion complète d'une unité de combustible, la vapeur d'eau étant supposée condensée et la chaleur récupérée ».
       */
      pcs: string|number|null
      /**
       * Volume de gaz consommé sur la période en conditions normales, c'est à dire sous une pression de 1 bar et une température de 0°C.
       */
      volumeConverti: number|null
      /**
       * PTA : Pression Température Altitude.
       * Coefficient lié aux conditions de température, pression et altitude au moment du relevé.
       */
      pta: string|number|null
      /**
       * - Publiée : Données de consommation journalières individuelles (uniquement pour les compteurs 1M et les MM).
       * - Informative Journalier : Données de consommation individuelles envoyées aux fournisseurs et permettant la facturation.
       */
      natureReleve: 'Publiée' | 'Informative Journalier' | string
      qualificationReleve: 'Estimé' | 'Mesuré' | 'Absence de Données' | string
      status: string|null
      /**
       * Coefficient produit du PTA et du PCS, calculé suivant la valeur moyenne sur la période de consommation.
       */
      coeffConversion: number
      frequenceReleve: string|null
      temperature: string|number|null
    }>
    frequence: string|null
  }
}
