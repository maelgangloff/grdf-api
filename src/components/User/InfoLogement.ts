/* eslint-disable camelcase */
export interface InfoLogement {
    /**
     * Identifiant du logement
     */
    id: number
    user_account: {
        /**
         * Identifiant de l'utilisateur actuel
         */
        id: number
        /**
         * Date de création du compte
         */
        created_at: string
        /**
         * Date de mise à jour du compte
         */
        updated_at: string
    }
    /**
     * Numéro unique identifiant le Point de Comptage et d'Estimation
     */
    numero_pce: string
    /**
     * Statut de l'habitant
     */
    statut_habitant: string | null
    /**
     * Type de logement
     */
    type_logement: string | null
    /**
     * Résidence
     */
    residence: string | null
    /**
     * Type de chauffage
     */
    type_chauffage: string | null
    /**
     * Localisation du compteur dans le logement
     */
    localisation_compteur: string | null
    /**
     * Type de chaudière
     */
    type_chaudiere: string | null
    /**
     * Date de création du logement dans la base
     */
    created_at: string
    /**
     * Date de mise à jour des informations du logement
     */
    updated_at: string
}
