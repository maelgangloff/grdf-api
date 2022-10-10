/* eslint-disable camelcase */
export interface InfoLogement {
    id: number
    user_account: {
        id: number
        created_at: string
        updated_at: string
    }
    numero_pce: string
    statut_habitant: string | null
    type_logement: string | null
    residence: string | null
    type_chauffage: string | null
    localisation_compteur: string | null
    type_chaudiere: string | null
    created_at: string
    updated_at: string
}
