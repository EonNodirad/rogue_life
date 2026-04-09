import type { Competence, stuff } from './types';

export const RARETE_COLORS: Record<string, string> = {
    commun: '#aaa', peu_commun: '#2ecc71', rare: '#3498db', epique: '#9b59b6', legendaire: '#f39c12',
};

export const ELEMENT_COLORS: Record<string, string> = {
    neutre: '#888', surnaturel: '#9b59b6', technologie: '#3498db',
    feu: '#e74c3c', eau: '#1abc9c', terre: '#8B6914',
    air: '#bdc3c7', vie: '#2ecc71', mort: '#555',
    tenebres: '#6c3483', lumiere: '#f1c40f',
};

export const rareteLabel: Record<string, string> = {
    commun: 'Commun', peu_commun: 'Peu commun', rare: 'Rare', epique: 'Épique', legendaire: 'Légendaire',
};

export const typeCompLabel: Record<string, string> = {
    attaque: 'Attaque', buff: 'Buff', statut: 'Statut',
};

export const EFFET_LABELS: Record<string, string> = {
    physique: '⚔️ Attaque physique', magique: '✨ Attaque magique',
    aleatoire: '🎲 Attaque aléatoire',
    vol_vie: '🩸 Attaque + vol de vie', vol_mana: '🔮 Attaque + vol de mana',
    ignore_def: '🔓 Attaque (ignore déf)', ignore_def_spe: '🔓 Attaque (ignore déf spé)',
    multi_frappe: '⚡ Multi-frappe', def_based: '🪨 Attaque (basée sur DEF)',
    def_spe_based: '🪨 Attaque (basée sur DEF SPÉ)', vitesse_based: '💨 Attaque (basée sur VIT)',
    surchauffe_add: '⚙️ Attaque + Surchauffe', surchauffe_add_mag: '⚙️ Attaque mag + Surchauffe',
    surchauffe_purge: '❄️ Attaque + Purge surchauffe', physique_sismique: '⛏️ Attaque sismique',
    buff_attq: '⬆️ Augmente ATQ', buff_attq_spe: '⬆️ Augmente ATQ SPÉ',
    buff_def: '⬆️ Augmente DEF', buff_def_spe: '⬆️ Augmente DEF SPÉ',
    buff_vitesse: '⬆️ Augmente Vitesse', buff_esquive: '⬆️ Augmente Esquive',
    buff_precision: '⬆️ Augmente Précision',
    soin: '💚 Soin', regen_pv: '💚 Régénération PV',
    riposte: '🛡️ Riposte', reduction_degats: '🛡️ Réduction dégâts',
    prochain_attq_mult: '⚡ Multiplicateur prochain coup',
    charge_sismique: '⛏️ Charge sismique', soin_restore_mana: '💧 Restaure mana',
    stun: '💫 Étourdissement', poison: '☠️ Poison', brulure: '🔥 Brûlure',
    marque: '💣 Marque explosive', anti_heal: '🚫 Bloque les soins',
    dissipe_buff: '✨ Dissipe les buffs ennemis',
    debuff_attq: '📉 Réduit ATQ ennemi', debuff_attq_spe: '📉 Réduit ATQ SPÉ ennemi',
    debuff_def: '📉 Réduit DEF ennemi', debuff_def_spe: '📉 Réduit DEF SPÉ ennemi',
    debuff_vitesse: '🐢 Réduit Vitesse ennemi', debuff_precision: '👁️ Réduit Précision ennemi',
    debuff_esquive: '👁️ Réduit Esquive ennemi',
};

export const EFFET_SEC_LABELS: Record<string, string> = {
    brulure: '🔥 Applique Brûlure', brulure_incurable: '🔥 Brûlure incurable',
    froid: '❄️ Applique Froid', stun: '💫 Étourdit',
    anti_heal: '🚫 Bloque soins', vol_mana: '🔮 Vole mana',
    debuff_precision: '👁️ Réduit Précision', debuff_vitesse: '🐢 Réduit Vitesse',
    debuff_def: '📉 Réduit DEF', debuff_def_spe: '📉 Réduit DEF SPÉ',
    debuff_attq: '📉 Réduit ATQ', debuff_attq_spe: '📉 Réduit ATQ SPÉ',
    dissipe_buff: '✨ Dissipe buffs',
};

export function compTooltipLines(c: Competence): string[] {
    const lines: string[] = [];
    const effLabel = EFFET_LABELS[c.effet_type] ?? c.effet_type;
    if (c.type === 'attaque') {
        lines.push(effLabel);
        if (c.effet_type === 'aleatoire') {
            lines.push(`💥 Dégâts : ${c.valeur} à ${c.puissance} (aléatoire)`);
        } else {
            lines.push(`💥 Puissance : ${c.puissance}`);
        }
        if (c.effet_type === 'multi_frappe')     lines.push(`   × ${c.valeur} frappes`);
        if (c.effet_type === 'ignore_def' || c.effet_type === 'ignore_def_spe') lines.push(`   Ignore ${c.valeur}% de la défense`);
        if (c.effet_type === 'vol_vie')           lines.push(`   Soigne ${c.valeur}% des dégâts infligés`);
        if (c.effet_type === 'vol_mana')          lines.push(`   Vole ${c.valeur} mana`);
        if (c.effet_type === 'surchauffe_add' || c.effet_type === 'surchauffe_add_mag') lines.push(`   +${c.valeur} charge(s) de Surchauffe`);
        if (c.effet_type === 'surchauffe_purge')  lines.push(`   Purge la Surchauffe · +${c.valeur} dégâts/charge`);
        if (c.effet_type === 'physique_sismique') lines.push(`   Consomme les charges sismiques (+${c.valeur}%/charge)`);
        if (c.effet_secondaire) {
            const secLabel = EFFET_SEC_LABELS[c.effet_secondaire] ?? c.effet_secondaire;
            let detail = '';
            if (c.valeur > 0 && c.effet_secondaire !== 'stun' && c.effet_secondaire !== 'dissipe_buff') detail += ` ${c.valeur}`;
            if (c.duree_tours > 0 && c.duree_tours < 99) detail += ` · ${c.duree_tours}t`;
            if (c.duree_tours === 99) detail += ' · Permanent';
            lines.push(`${secLabel}${detail}`);
        }
    } else if (c.type === 'buff') {
        lines.push(effLabel);
        lines.push(`   +${c.valeur} pendant ${c.duree_tours} tours`);
    } else {
        lines.push(effLabel);
        if (c.valeur > 0) {
            if (c.effet_type === 'soin')               lines.push(`   Soigne ${c.valeur}% des PV max`);
            else if (c.effet_type === 'regen_pv')      lines.push(`   +${c.valeur}% PV max / tour · ${c.duree_tours}t`);
            else if (c.effet_type === 'marque')        lines.push(`   Explose pour ${c.valeur} dégâts dans ${c.duree_tours}t`);
            else if (c.effet_type === 'riposte')       lines.push(`   Renvoie ${c.valeur}% des dégâts reçus · ${c.duree_tours}t`);
            else if (c.effet_type === 'reduction_degats') lines.push(`   Réduit les dégâts subis de ${c.valeur}% · ${c.duree_tours}t`);
            else if (c.effet_type === 'prochain_attq_mult') lines.push(`   Prochain coup ×${(c.valeur / 100).toFixed(1)}`);
            else if (c.effet_type.startsWith('debuff_')) lines.push(`   −${c.valeur} · ${c.duree_tours}t`);
            else if (c.duree_tours > 0) lines.push(`   Valeur ${c.valeur} · ${c.duree_tours}t`);
            else lines.push(`   ${c.valeur}`);
        } else if (c.duree_tours > 0) {
            lines.push(`   ${c.duree_tours} tour(s)`);
        }
    }
    return lines;
}

export function itemBonusLines(s: stuff): string[] {
    const lines: string[] = [];
    if (s.bonus_attq)      lines.push(`⚔️ ATQ +${s.bonus_attq}`);
    if (s.bonus_attq_spe)  lines.push(`✨ ATQ SPÉ +${s.bonus_attq_spe}`);
    if (s.bonus_def)       lines.push(`🛡️ DEF +${s.bonus_def}`);
    if (s.bonus_def_spe)   lines.push(`🔮 DEF SPÉ +${s.bonus_def_spe}`);
    if (s.bonus_vitesse)   lines.push(`💨 VIT +${s.bonus_vitesse}`);
    if (s.bonus_pv_combat) lines.push(`💗 PV combat +${s.bonus_pv_combat}`);
    if (s.bonus_aff_elem)  lines.push(`🌀 Aff. élément +${s.bonus_aff_elem}%`);
    if (s.soin_pv)         lines.push(`💚 Soin PV IRL +${s.soin_pv}`);
    return lines;
}

const effetLabelCourt: Record<string, string> = {
    physique: 'Physique', magique: 'Magique',
    buff_attq: '+ATQ', buff_attq_spe: '+ATQ SPÉ',
    buff_def: '+DEF', buff_def_spe: '+DEF SPÉ',
    buff_vitesse: '+VIT', buff_esquive: '+Esquive',
    soin: 'Soin', regen_pv: 'Rég. PV',
    poison: 'Poison', brulure: 'Brûlure',
    stun: 'Étourdissement', riposte: 'Riposte',
    reduction_degats: 'Réd. dégâts', marque: 'Marque',
    anti_heal: 'Anti-soin', dissipe_buff: 'Dissipe buffs',
};

export function compEffetStr(c: Competence): string {
    if (c.type === 'attaque') {
        if (c.effet_type === 'aleatoire') return `Dégâts ${c.valeur}–${c.puissance}`;
        return `Puissance ${c.puissance}`;
    }
    if (c.type === 'buff') return `${effetLabelCourt[c.effet_type] ?? c.effet_type} +${c.valeur} · ${c.duree_tours}t`;
    // Cas statut spécifiques
    if (c.effet_type === 'stun')               return `Étourdit le monstre 1 tour`;
    if (c.effet_type === 'prochain_attq_mult') return `Prochain coup ×${(c.valeur / 100).toFixed(1)}`;
    if (c.effet_type === 'soin')               return `Soin ${c.valeur}% PV max`;
    if (c.effet_type === 'regen_pv')           return `+${c.valeur}% PV/tour · ${c.duree_tours}t`;
    if (c.effet_type === 'riposte')            return `Riposte ${c.valeur}% · ${c.duree_tours}t`;
    if (c.effet_type === 'reduction_degats')   return `Réd. dégâts ${c.valeur}% · ${c.duree_tours}t`;
    if (c.effet_type === 'marque')             return `Marque · explose ${c.valeur} dégâts`;
    if (c.effet_type.startsWith('debuff_'))    return `${effetLabelCourt[c.effet_type] ?? c.effet_type} −${c.valeur} · ${c.duree_tours}t`;
    return `${effetLabelCourt[c.effet_type] ?? c.effet_type} ${c.valeur > 0 ? c.valeur + '/tour · ' : ''}${c.duree_tours}t`;
}

export function bonusStr(s: stuff): string {
    const b: string[] = [];
    if (s.bonus_attq)      b.push(`ATQ +${s.bonus_attq}`);
    if (s.bonus_attq_spe)  b.push(`ATQ SPE +${s.bonus_attq_spe}`);
    if (s.bonus_def)       b.push(`DEF +${s.bonus_def}`);
    if (s.bonus_def_spe)   b.push(`DEF SPE +${s.bonus_def_spe}`);
    if (s.bonus_vitesse)   b.push(`VIT +${s.bonus_vitesse}`);
    if (s.bonus_pv_combat) b.push(`PV +${s.bonus_pv_combat}`);
    if (s.bonus_aff_elem)  b.push(`Aff. +${s.bonus_aff_elem}%`);
    return b.join(' · ') || '—';
}
