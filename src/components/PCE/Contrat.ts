export interface Contrat {
  /**
   * Ce Tarif d'acheminement gaz du titulaire est choisi par le fournisseur en fonction d'une estimation du volume de gaz consommé.
   * Il représente le tarif d’utilisation du réseau public de distribution du gaz naturel.
   *
   * Les tarifs d’acheminement comprennent plusieurs options tarifaires pour les particuliers et professionnels selon leur volume de consommation :
   * - T1 : Consommation inférieure à 6000 kWh / an.
   * - T2 : Consommation entre 6000 kWh / an et 300 MWh / an.
   * - T3 : Consommation entre 300 MWh / an et 5 GWh / an (essentiellement des entreprises tertiaires ou industrielles de taille moyenne).
   * - T4 : Consommation supérieure à 5 GWh / an (grands sites industriels directement rattachés au réseau de distribution de gaz naturel).
   * - TP : Tarif de Proximité, il s’agit d’une option tarifaire concernant des clients finaux ayant la possibilité règlementaire de se raccorder au réseau de transport.
   * - TB : Tarif Biométhane, il s'agit d'une option tarifaire concernant les producteurs de biométhane
   */
  tarifAcheminement: string
  /**
   * Consommation Annuelle de Référence (CAR) en kWh :
   * * Quantité de gaz estimée consommée sur une année, dans des conditions climatiques moyennes.
   * * La CAR d’une année N s’appliquent du 1er avril de l’année N au 31 mars de l’année N+1. Elle est mise à jour de manière systématique par le Gestionnaire de Réseau de Distribution (GRD).
   */
  carActuelle: number
  /**
   * Prochaine Consommation Annuelle de Référence (CAR) en kWh
   */
  carFuture: number
  /**
   * Prochain Profil Type
   */
  profilTypeFutur: string
  /**
   * Capacité Journalière d’Acheminement (CJA) en kWh/jour :
   * * Quantité maximale d’énergie que le distributeur s'engage à acheminer chaque jour en un point de livraison.
   * * Elle se compose d’une souscription annuelle à laquelle peut s’ajouter une souscription mensuelle supplémentaire et/ou une souscription journalière supplémentaire. Ce type de donnée est applicable seulement aux compteurs JJ et pour les clients de tarif T4 ou TP (Tarif de Proximité).
   */
  cja: string|null
  /**
   * Souscription mensuelle supplémentaire
   */
  cjaMensuelle: string|null
  /**
   * Souscription journalière supplémentaire
   */
  cjaJournaliere: string|null

  idCad: string
  /**
   * Nom du titulaire du contrat de fourniture d'énerge
   */
  nomTitulaire: string
  /**
   * Raison sociale du titulaire (si applicable)
   */
  raisonSocialeTitulaire: string|null
  /**
   * Numéro SIRET du titulaire (si applicable)
   */
  numeroSiretTitulaire: string|null
  /**
   * Date de la Mise En Service (MES) du PCE correspondante au titulaire actif
   */
  dateMes: string|null
  /**
   * Date de la Mise Hors Service (MHS) du PCE correspondante au titulaire actif
   */
  dateMhs: string|null
  /**
   * Statut du contrat
   */
  statutContractuel: string
  /**
   * Plafond de consommation journalière
   */
  consommationJournalierePlafond: string|null
  /**
   * Modulation de Stockage Année N-1
   */
  modulationN1: string|null
  /**
   * Modulation de Stockage Année N-2
   */
  modulationN2: string|null
  /**
   * Modulation de Stockage Année N-3
   */
  modulationN3: string|null
  /**
   * Modulation de Stockage Année N-4
   */
  modulationN4: string|null
  /**
   * Assiette de compensation de stockage. Moyenne des 2 modulation plus petite.
   */
  assiette: string|null
  /**
   * Fournisseur d'énergie souscrit
   */
  fournisseur: string
  /**
   * Le Profil Type (est attribué par le Distributeur) caractérise la répartition de la CAR d’un PCE tout au long de l’année.
   * Il est notamment utilisé entre deux relevés pour estimer les quantités journalières d'un PCE.
   * Ce dernier est déterminé automatiquement par le système d’informations de GRDF à partir de la CAR saisie par le fournisseur (puis chaque année à partir de la CAR recalculée par GRDF).
   *
   * Dix profils types permettent de définir les usages de consommations du gaz naturel :
   * - P000 : Client PCE forfait cuisine
   * - P011 : Client Gazpar (compteur 1M) ou à relevé semestriel avec une CAR inférieure à 6000 kWh/an (compteur 6M)
   * - P012 : Client Gazpar (compteur 1M) ou à relevé semestriel avec une CAR supérieure ou égale à 6000 kWh/an (compteur 6M)
   * - P013 : Client à relevé mensuel (compteur MM) ou journalier (compteur JJ) avec une part hiver corrigée moyenne inférieure ou égale à 39%
   * - P014 : Client à relevé mensuel (compteur MM) ou journalier (compteur JJ) avec une part hiver corrigée moyenne entre 39% et 50%
   * - P015 : Client à relevé mensuel (compteur MM) ou journalier (compteur JJ) avec une part hiver corrigée moyenne entre 50% et 58%
   * - P016 : Client à relevé mensuel (compteur MM) ou journalier (compteur JJ) avec une part hiver corrigée moyenne entre 58% et 69%
   * - P017 : Client à relevé mensuel (compteur MM) ou journalier (compteur JJ) avec une part hiver corrigée moyenne entre 69% et 75%
   * - P018 : Client à relevé mensuel (compteur MM) ou journalier (compteur JJ) avec une part hiver corrigée moyenne entre 75% et 81%
   * - P019 : Client à relevé mensuel (compteur MM) ou journalier (compteur JJ) avec une part hiver corrigée moyenne strictement supérieure à 81%
   *
   * Le Profil Type d’une année N s’appliquent du 1er avril de l’année N au 31 mars de l’année N+1.
   * Il est mis à jour de manière systématique par le Gestionnaire de Réseau de Distribution (GRD), une fois par an à date fixe, sauf en cas d'évènement spécifique :
   * - Premières Mise En Service (MES)
   * - Changement de fournisseur avec changement de tarif ou de fréquence de relevé
   * - Changement de données tarifaires
   * - Corrections d’une erreur manifeste (CAR et/ou profil aberrant)
   */
  profil: string
  /**
   * Date de début de validité du Profil Type actuel
   */
  dateDebutProfil: string
  /**
   * Date de fin de validité du Profil Type actuel
   */
  dateFinProfil: string
}
