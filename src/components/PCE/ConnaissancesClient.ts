/* eslint-disable camelcase */
export interface ConnaissancesClient {
    /**
     * Identifiant du formulaire de connaissances client
     */
    id: number
    user_account: {
        id: number
        created_at: string
        updated_at: string
    }
    /**
     * Numéro unique identifiant le Point de Comptage et d'Estimation
     */
    numero_pce: string
    /**
     * Type de logement (maison, appartement, autre)
     */
    type_logement: string
    /**
     * Statut d'occupation (propriétaire, locataire)
     */
    statut_occupation: string
    /**
     * Type de résidence (principale, secondaire)
     */
    type_residence: string
    /**
     * Type de chauffage (individuel, collectif, je ne sais pas)
     */
    type_chauffage: string
    /**
     * Surface habitable en m2
     */
    surface_habitable: string
    /**
     * Année de construction
     */
    annee_construction: string
    /**
     * Nombre d'occupants du logement
     */
    nombre_occupants: string
    /**
     * Forme du logement
     */
    forme_logement: string
    /**
     * Indique si le logement est mitoyen
     */
    logement_mitoyen: boolean
    /**
     * Type de plancher
     */
    type_plancher: string
    /**
     * Type de toiture
     */
    type_toiture: string
    /**
     * Nombre de niveaux chauffés
     */
    nombre_niveaux_chauffes: string
    /**
     * Energie principale de chauffage
     */
    energie_principale_chauffage: string
    /**
     * Type d'équipement de chauffage
     */
    type_equipement_chauffage: string
    /**
     * Âge de l'équipement de chauffage
     */
    age_equipement_chauffage: string
    /**
     * Energie de production de l'eau chaude
     */
    energie_production_eau_chaude: string
    /**
     * Mode de production de l'eau chaude
     */
    mode_production_eau_chaude: string
    /**
     * Equipement de production de l'eau chaude
     */
    equipement_production_eau_chaude: string
    /**
     * Energie pour la cuisson
     */
    energie_cuisson: string
    /**
     * Indique si le logement a été rénové ces dix dernières années
     */
    renovation_dix_dernieres_annees: boolean
    /**
     * Indique si la toiture ou les comples sont isolés
     */
    isolation_toiture_ou_combles: boolean
    /**
     * Indique si les murs sont isolés
     */
    isolation_murs: boolean
    /***
     * Type d'isolation des murs
     */
    isolation_murs_type: string
    /**
     * Indique si le plancher bas est isolé
     */
    isolation_plancher_bas: boolean
    /**
     * Indique si les fenêtres ont été remplacées
     */
    remplacement_fenetre: boolean
    /**
     * Indique si les fenêtres de toit ont été remplacées
     */
    remplacement_fenetre_toit: boolean
    /**
     * Indique si le logement possède de la ventilation
     */
    ventilation: boolean
    /**
     * Type de ventilation du logement
     */
    ventilation_type: string
    /**
     * Indique si le logement est isolé par un autre moyen
     */
    isolation_autre: boolean
    /**
     * Indique si un projet de travaux sont prévus d'ici l'année prochaine
     */
    projets_logement_next_year: boolean
    /**
     * Projet de logement
     */
    projet_logement: string
    /**
     * Période de démarrage du projet
     */
    periode_demarrage_projet: string
    /**
     * Indique si le formulaire est complété
     */
    is_completed: boolean

    /**
     * Indique si une estimation du DPE du logement existe
     */
    qee: boolean
    /**
     * Date de création du formulaire de connaissances client
     */
    created_at: string
    /**
     * Date de mise à jour du formulaire de connaissances client
     */
    updated_at: string
}
