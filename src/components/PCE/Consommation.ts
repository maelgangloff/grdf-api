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
    /**
     * Numéro unique identifiant le Point de Comptage et d'Estimation
     */
    idPce: string
    releves: Array<{
      /**
       * Date de début de la relève
       */
      dateDebutReleve: string
      /**
       * Date de fin de la relève
       */
      dateFinReleve: string
      /**
       * Journée gazière concernée par le relevée
       */
      journeeGaziere: string | null
      /**
       * Index du compteur à la date de début de la relève
       */
      indexDebut: number
      /**
       * Index du compteur à la date de fin de la relève
       */
      indexFin: number
      /**
       * Volume brut consommé (en m3)
       */
      volumeBrutConsomme: number
      /**
       * Energie consommée (en kWh)
       * energie = coeff_pta * coef_pcs * volume_brut = coeff_conversion * volume_brut
       */
      energieConsomme: number
      /**
       * PCS : Pouvoir Calorifique Supérieur du Gaz
       * Il s'agit de la « quantité d'énergie dégagée par la combustion complète d'une unité de combustible (1m3).
       * La vapeur d'eau étant supposée condensée et la chaleur récupérée ».
       */
      pcs: string|number|null
      /**
       * Volume de gaz consommé sur la période en conditions normales, c'est à dire sous une pression de 1 bar (105 Pa), à une température de 273°K (0°C)
       * Unité : Nm3 (Normal m3) quantité de gaz exempt de vapeur d'eau.
       * volume_converti = volume_brut * coeff_pta
       */
      volumeConverti: number|null
      /**
       * PTA : Pression Température Altitude
       * Coefficient décrivant les conditions de température, pression et altitude au moment du relevé
       * coeff_pta = (valeur index_converti_fin - valeur index_converti_début) / (valeur index_brut_fin - valeur index_brut_debut)
       */
      pta: string|number|null
      /**
       * - Publiée : Données de consommation journalières individuelles (uniquement pour les compteurs 1M et les MM).
       * - Informative Journalier : Données de consommation individuelles envoyées aux fournisseurs et permettant la facturation.
       */
      natureReleve: 'Publiée' | 'Informative Journalier' | string
      /**
       * Qualification du relevé
       */
      qualificationReleve: 'Estimé' | 'Corrigé' | 'Mesuré' | 'Absence de Données' | string
      /**
       * Statut de la relève
       */
      status: 'Provisoire' | 'Définitive' | string|null
      /**
       * Coefficient produit du PTA et du PCS, calculé suivant la valeur moyenne sur la période de consommation.
       * coeff_conversion = coeff_pta * valeur_pcs
       */
      coeffConversion: number
      /**
       * Fréquence de la relève
       */
      frequenceReleve: string|null
      /**
       * Température lors de la relève
       */
      temperature: string|number|null
    }>
    /**
     * Fréquence de la relève
     */
    frequence: string|null
  }
}
