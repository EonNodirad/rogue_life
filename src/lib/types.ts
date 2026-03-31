export type Rarete = 'commun' | 'peu_commun' | 'rare' | 'epique' | 'legendaire'

export type GameMode = 'normal' | 'hard' | 'cauchemar'

export interface Personnage {
    id :number
    nom: string
    experience_actuelle: number
    gold_actuel: number
    classe_id:number
    titre_id:number
    level_id:number
    caracteristique_id:number
    points_stat_disponibles: number
    compteur_routines: number
    compteur_loot_donjon: number
    mode: GameMode
    mode_debut: string | null
    dernier_coffre_hebdo: string | null
    dernier_coffre_mensuel: string | null
}

export interface Caracteristique {
    id : number
    pv_vie_max: number
    pv_vie_actuels: number
    pv_combat_max: number
    pv_combat_actuels: number
    attq:number
    attq_spe:number
    def:number
    def_spe:number
    vitesse:number
}

export interface Level {
    id:number
    exp_max_requise:number
}

export interface Titre {
    id:number
    nom:string
    bonus_stat:string
}

export interface Classe {
    id:number
    nom:string
}

export interface Monstre {
    id:number
    nom:string
    caracteristique_id:number
    exp_recompense:number
    gold_recompense:number

}

export interface Donjon {
    id:number
    nom:string
    niveau_recommande:number
}

export interface Donjon_Monstre {
    donjon_id:number
    monstre_id:number
    taux_apparition:number
}

export interface historique_poids {
    id:number
    personnage_id:number
    date_mesure:Date
    valeur_poids:number
}

export interface stuff {
    id:number
    nom:string
    categorie: 'arme' | 'armure' | 'utilitaire'
    slot: 'arme_1main' | 'arme_2mains' | 'bouclier_1main' | 'bouclier_2mains' | 'tete' | 'plastron' | 'jambiere' | 'bottes' | 'gants' | 'consommable' | 'joker'
    rarete: 'commun' | 'peu_commun' | 'rare' | 'epique' | 'legendaire'
    soin_pv: number
    bonus_attq:number
    bonus_attq_spe:number
    bonus_def:number
    bonus_def_spe:number
    bonus_vitesse:number
    bonus_pv_combat:number
    prix_base:number
}

export interface inventaire {
    id:number
    personnage_id:number
    stuff_id:number
    quantite:number
    est_equipe:boolean

}

export interface magasin{
    id:number
    nom:string
}

export interface magasin_inventaire{
    magasin_id:number
    stuff_id:number
    prix_vente_local:number
}

export interface tache{
    id:number
    nom:string
    type_activite:string
    type: 'ponctuelle' | 'routine'
    difficulte:number
    exp_recompense:number
    gold_recompense:number
    pv_vie_penalite:number
    duree_jours?: number
    date_creation?: string
    date_limite?: string
}

export type Element =
    | 'neutre' | 'surnaturel' | 'technologie' | 'feu'
    | 'eau' | 'terre' | 'air' | 'vie' | 'mort' | 'tenebres' | 'lumiere'

export interface Competence {
    id: number
    nom: string
    description: string
    type: 'attaque' | 'buff' | 'statut'
    effet_type: 'physique' | 'magique' | 'buff_attq' | 'buff_def' | 'buff_vitesse' | 'poison' | 'stun'
    valeur: number
    duree_tours: number
    rarete: 'commun' | 'peu_commun' | 'rare' | 'epique' | 'legendaire'
    prix_boutique: number
    element: Element
}

export interface PersonnageCompetence {
    id: number
    personnage_id: number
    competence_id: number
    est_equipee: boolean
}

export interface PersonnageAffinite {
    id: number
    personnage_id: number
    element: Element
    bonus_pct: number
}

export interface historique_activite{
    id:number
    personnage_id:number
    tache_id:number
    date_action:Date
    statut:string
    nom_tache:string
}