import { writable } from 'svelte/store';
import { getPersonnage, getCaracteristique } from '$lib/db';

export const characterStore = writable({
    pv_vie_actuels: 0,
    pv_vie_max: 0,
    level_id: 0,
    gold_actuel: 0,
    mode: 'normal' as import('$lib/types').GameMode,
});

export async function refreshCharacterStore(): Promise<void> {
    const p = await getPersonnage(1);
    if (!p) return;
    const c = await getCaracteristique(p.caracteristique_id);
    if (!c) return;
    characterStore.set({
        pv_vie_actuels: c.pv_vie_actuels,
        pv_vie_max: c.pv_vie_max,
        level_id: p.level_id,
        gold_actuel: p.gold_actuel,
        mode: (p.mode ?? 'normal') as import('$lib/types').GameMode,
    });
}
