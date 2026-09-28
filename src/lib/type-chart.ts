import chartData from '$lib/data/types.json';

export interface PokemonType {
	id: string;
	name: string;
	color: string;
}

export interface Matchup {
	type: PokemonType;
	multiplier: number;
}

export type Side = 'mine' | 'rival';

const data = chartData as {
	types: PokemonType[];
	effectiveness: Record<string, Record<string, number>>;
};

export const types: PokemonType[] = data.types;

const typeById = new Map(types.map((type) => [type.id, type]));
const typeOrder = new Map(types.map((type, index) => [type.id, index]));

export function getType(id: string): PokemonType {
	const type = typeById.get(id);
	if (!type) {
		throw new Error(`Unknown type: ${id}`);
	}
	return type;
}

export function attackMultiplier(attackerId: string, defenderId: string): number {
	return data.effectiveness[attackerId]?.[defenderId] ?? 1;
}

export function defenseMultiplier(attackerId: string, defenderIds: string[]): number {
	return defenderIds.reduce(
		(total, defenderId) => total * attackMultiplier(attackerId, defenderId),
		1
	);
}

export function bestOffense(attackerIds: string[], defenderId: string): number {
	if (attackerIds.length === 0) {
		return 1;
	}

	return Math.max(...attackerIds.map((attackerId) => attackMultiplier(attackerId, defenderId)));
}

function byTypeOrder(a: Matchup, b: Matchup): number {
	return (typeOrder.get(a.type.id) ?? 0) - (typeOrder.get(b.type.id) ?? 0);
}

export function superEffectiveAttacks(defenderIds: string[]): Matchup[] {
	return types
		.map((type) => ({
			type,
			multiplier: defenseMultiplier(type.id, defenderIds)
		}))
		.filter((matchup) => matchup.multiplier > 1)
		.sort((a, b) => b.multiplier - a.multiplier || byTypeOrder(a, b));
}

export function resistedAttacks(defenderIds: string[]): Matchup[] {
	return types
		.map((type) => ({
			type,
			multiplier: defenseMultiplier(type.id, defenderIds)
		}))
		.filter((matchup) => matchup.multiplier < 1)
		.sort((a, b) => a.multiplier - b.multiplier || byTypeOrder(a, b));
}

export function superEffectiveTargets(attackerIds: string[]): PokemonType[] {
	return types.filter((type) => bestOffense(attackerIds, type.id) > 1);
}

export function textColor(hex: string): string {
	const value = hex.slice(1);
	const red = Number.parseInt(value.slice(0, 2), 16);
	const green = Number.parseInt(value.slice(2, 4), 16);
	const blue = Number.parseInt(value.slice(4, 6), 16);
	const luminance = (red * 299 + green * 587 + blue * 114) / 1000;
	return luminance > 150 ? '#111111' : '#ffffff';
}

const multiplierLabels: Record<string, string> = {
	'0': '×0',
	'0.25': '×¼',
	'0.5': '×½',
	'1': '×1',
	'2': '×2',
	'4': '×4'
};

export function formatMultiplier(multiplier: number): string {
	return multiplierLabels[String(multiplier)] ?? `×${multiplier}`;
}

export function cellLabel(multiplier: number): string {
	if (multiplier === 1) return '';
	if (multiplier === 0.5) return '½';
	if (multiplier === 0) return '0';
	return String(multiplier);
}
