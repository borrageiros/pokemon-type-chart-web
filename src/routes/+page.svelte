<script lang="ts">
	import {
		attackMultiplier,
		bestOffense,
		cellLabel,
		defenseMultiplier,
		formatMultiplier,
		getType,
		resistedAttacks,
		superEffectiveAttacks,
		superEffectiveTargets,
		textColor,
		types,
		type Side
	} from '$lib/type-chart';
	import TypeIcon from '$lib/components/TypeIcon.svelte';

	let mode = $state<Side>('mine');
	let selected = $state<string[]>([]);
	let hoveredRow = $state<string | null>(null);
	let hoveredColumn = $state<string | null>(null);

	const threats = $derived(selected.length === 0 ? [] : superEffectiveAttacks(selected));
	const strengths = $derived(selected.length === 0 ? [] : superEffectiveTargets(selected));
	const hardMatchups = $derived(selected.length === 0 ? [] : resistedAttacks(selected));

	function toggleType(id: string) {
		if (selected.includes(id)) {
			selected = selected.filter((typeId) => typeId !== id);
			return;
		}

		selected = selected.length >= 2 ? [selected[1], id] : [...selected, id];
	}

	function attackTone(attackerId: string): 'good' | 'bad' | null {
		if (selected.length === 0) return null;

		const multiplier = defenseMultiplier(attackerId, selected);
		if (mode === 'mine') return multiplier > 1 ? 'bad' : null;
		if (multiplier > 1) return 'good';
		if (multiplier < 1) return 'bad';
		return null;
	}

	function defenseTone(defenderId: string): 'good' | null {
		if (mode !== 'mine' || selected.length === 0) return null;
		return bestOffense(selected, defenderId) > 1 ? 'good' : null;
	}

	function cellTitle(attackerName: string, defenderName: string, multiplier: number): string {
		return `${attackerName} vs ${defenderName}: ${formatMultiplier(multiplier)}`;
	}

	function hoverRow(id: string) {
		hoveredRow = id;
		hoveredColumn = null;
	}

	function hoverColumn(id: string) {
		hoveredColumn = id;
		hoveredRow = null;
	}

	function hoverCell(rowId: string, columnId: string) {
		hoveredRow = rowId;
		hoveredColumn = columnId;
	}

	function clearHover() {
		hoveredRow = null;
		hoveredColumn = null;
	}
</script>

<div class="app">
	<header class="toolbar">
		<div class="controls">
			<div class="modes" role="group" aria-label="Whose Pokémon the types belong to">
				<button type="button" aria-pressed={mode === 'mine'} onclick={() => (mode = 'mine')}
					>My Pokémon</button
				>
				<button type="button" aria-pressed={mode === 'rival'} onclick={() => (mode = 'rival')}
					>Rival</button
				>
			</div>

			<div class="selection">
				{#if selected.length === 0}
					<p class="hint">Pick up to two types on the chart</p>
				{:else}
					{#each selected as id (id)}
						{@const type = getType(id)}
						<button
							type="button"
							class="chip"
							style:background={type.color}
							style:color={textColor(type.color)}
							onclick={() => toggleType(id)}
						>
							<TypeIcon id={type.id} />
							{type.name}
						</button>
					{/each}
					<button type="button" class="clear" onclick={() => (selected = [])}>Clear</button>
				{/if}
			</div>

			<ul class="legend">
				<li><span class="swatch super"></span>2 super effective</li>
				<li><span class="swatch resist"></span>½ not very effective</li>
				<li><span class="swatch immune"></span>0 immune</li>
			</ul>
		</div>

		<div class="results" aria-live="polite">
			{#if selected.length === 0}
				<p class="hint wide">
					{#if mode === 'mine'}
						Shows what your Pokémon is weak to and what it is strong against.
					{:else}
						Shows what beats the rival and what struggles against it.
					{/if}
				</p>
			{:else if mode === 'mine'}
				<section class="group">
					<h2>Weak to</h2>
					<ul>
						{#if threats.length === 0}
							<li class="empty">None</li>
						{:else}
							{#each threats as matchup (matchup.type.id)}
								<li>
									<span
										class="chip static"
										style:background={matchup.type.color}
										style:color={textColor(matchup.type.color)}
									>
										<TypeIcon id={matchup.type.id} />
										{matchup.type.name}
										{formatMultiplier(matchup.multiplier)}
									</span>
								</li>
							{/each}
						{/if}
					</ul>
				</section>
				<section class="group">
					<h2 class="good">Strong against</h2>
					<ul>
						{#if strengths.length === 0}
							<li class="empty">None</li>
						{:else}
							{#each strengths as type (type.id)}
								<li>
									<span
										class="chip static"
										style:background={type.color}
										style:color={textColor(type.color)}
									>
										<TypeIcon id={type.id} />
										{type.name}
									</span>
								</li>
							{/each}
						{/if}
					</ul>
				</section>
			{:else}
				<section class="group">
					<h2 class="good">Beat it with</h2>
					<ul>
						{#if threats.length === 0}
							<li class="empty">None</li>
						{:else}
							{#each threats as matchup (matchup.type.id)}
								<li>
									<span
										class="chip static"
										style:background={matchup.type.color}
										style:color={textColor(matchup.type.color)}
									>
										<TypeIcon id={matchup.type.id} />
										{matchup.type.name}
										{formatMultiplier(matchup.multiplier)}
									</span>
								</li>
							{/each}
						{/if}
					</ul>
				</section>
				<section class="group">
					<h2>Struggles with</h2>
					<ul>
						{#if hardMatchups.length === 0}
							<li class="empty">None</li>
						{:else}
							{#each hardMatchups as matchup (matchup.type.id)}
								<li>
									<span
										class="chip static"
										style:background={matchup.type.color}
										style:color={textColor(matchup.type.color)}
									>
										<TypeIcon id={matchup.type.id} />
										{matchup.type.name}
										{formatMultiplier(matchup.multiplier)}
									</span>
								</li>
							{/each}
						{/if}
					</ul>
				</section>
			{/if}
		</div>
	</header>

	<div class="chart-scroll">
		<div class="chart" onmouseleave={clearHover}>
			<div class="corner">
				<span>Defense →</span>
				<span>Attack ↓</span>
			</div>
			{#each types as defender (defender.id)}
				<button
					type="button"
					class="col-header"
					class:selected={selected.includes(defender.id)}
					class:good={defenseTone(defender.id) === 'good'}
					class:hot={hoveredColumn === defender.id}
					style:background={defender.color}
					style:color={textColor(defender.color)}
					aria-pressed={selected.includes(defender.id)}
					onmouseenter={() => hoverColumn(defender.id)}
					onclick={() => toggleType(defender.id)}
				>
					<span>{defender.name}</span>
					<TypeIcon id={defender.id} />
				</button>
			{/each}
			{#each types as attacker (attacker.id)}
				<button
					type="button"
					class="row-header"
					class:selected={selected.includes(attacker.id)}
					class:good={attackTone(attacker.id) === 'good'}
					class:bad={attackTone(attacker.id) === 'bad'}
					class:hot={hoveredRow === attacker.id}
					style:background={attacker.color}
					style:color={textColor(attacker.color)}
					aria-pressed={selected.includes(attacker.id)}
					onmouseenter={() => hoverRow(attacker.id)}
					onclick={() => toggleType(attacker.id)}
				>
					<TypeIcon id={attacker.id} />
					<span>{attacker.name}</span>
				</button>
				{#each types as defender (defender.id)}
					{@const multiplier = attackMultiplier(attacker.id, defender.id)}
					<div
						class="cell"
						class:dim={selected.length > 0 &&
							!selected.includes(attacker.id) &&
							!selected.includes(defender.id)}
						class:row-hot={hoveredRow === attacker.id}
						class:col-hot={hoveredColumn === defender.id}
						data-value={multiplier}
						title={cellTitle(attacker.name, defender.name, multiplier)}
						onmouseenter={() => hoverCell(attacker.id, defender.id)}
					>
						{cellLabel(multiplier)}
					</div>
				{/each}
			{/each}
		</div>
	</div>
</div>

<style>
	.app {
		height: 100dvh;
		display: grid;
		grid-template-rows: auto minmax(0, 1fr);
		background: #000;
		overflow: hidden;
	}

	.toolbar {
		display: grid;
		gap: 0.55rem;
		padding: 0.55rem 0.7rem 0.65rem;
		border-bottom: 1px solid #222;
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.7rem 1rem;
	}

	.modes {
		display: flex;
		border: 1px solid #333;
		border-radius: 999px;
		overflow: hidden;
	}

	.modes button,
	.clear {
		border: 0;
		background: transparent;
		color: #fff;
		cursor: pointer;
	}

	.modes button {
		padding: 0.35rem 0.8rem;
		font-size: 0.85rem;
	}

	.modes button[aria-pressed='true'] {
		background: #fff;
		color: #000;
	}

	.selection {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.35rem;
		min-height: 1.7rem;
	}

	.hint {
		color: #9a9a9a;
		font-size: 0.85rem;
	}

	.hint.wide {
		grid-column: 1 / -1;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.28rem;
		border: 0;
		border-radius: 999px;
		padding: 0.15rem 0.55rem;
		font-size: 0.78rem;
		font-weight: 700;
		line-height: 1.4;
		cursor: pointer;
	}

	.chip.static {
		cursor: default;
	}

	.clear {
		padding: 0.15rem 0.45rem;
		color: #bbb;
		font-size: 0.78rem;
		text-decoration: underline;
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		margin-left: auto;
		color: #c8c8c8;
		font-size: 0.75rem;
		list-style: none;
	}

	.legend li {
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}

	.swatch {
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 2px;
	}

	.swatch.super {
		background: #1f7a34;
	}

	.swatch.resist {
		background: #7a2e2e;
	}

	.swatch.immune {
		background: #2b2b2b;
		box-shadow: inset 0 0 0 1px #555;
	}

	.results {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.4rem 1.25rem;
	}

	.group h2 {
		margin-bottom: 0.25rem;
		color: #ff8d8d;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.group h2.good {
		color: #8dffb0;
	}

	.group ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		list-style: none;
	}

	.empty {
		color: #888;
		font-size: 0.8rem;
	}

	.chart-scroll {
		min-height: 0;
		overflow: auto;
	}

	.chart {
		display: grid;
		grid-template-columns: minmax(7.2rem, 8rem) repeat(18, minmax(1.7rem, 1fr));
		grid-template-rows: minmax(6.2rem, 7rem) repeat(18, minmax(0, 1fr));
		gap: 1px;
		box-sizing: border-box;
		height: 100%;
		min-width: calc(7.2rem + 18 * 1.7rem);
		background: #161616;
	}

	.corner {
		position: sticky;
		top: 0;
		left: 0;
		z-index: 3;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0.3rem;
		background: #000;
		color: #9a9a9a;
		font-size: 0.62rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.col-header,
	.row-header {
		border: 0;
		padding: 0.1rem;
		font-size: 0.68rem;
		font-weight: 700;
		line-height: 1.1;
		cursor: pointer;
	}

	.col-header {
		position: sticky;
		top: 0;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		gap: 0.2rem;
		padding: 0.25rem 0.1rem 0.35rem;
	}

	.col-header span {
		writing-mode: vertical-rl;
		transform: rotate(180deg);
		white-space: nowrap;
	}

	.row-header {
		position: sticky;
		left: 0;
		z-index: 1;
		display: flex;
		align-items: center;
		gap: 0.28rem;
		text-align: left;
		padding-left: 0.35rem;
	}

	.col-header.selected,
	.row-header.selected,
	.col-header.hot,
	.row-header.hot {
		outline: 2px solid #fff;
		outline-offset: -2px;
		z-index: 4;
	}

	.col-header.hot,
	.row-header.hot {
		filter: brightness(1.18);
		z-index: 5;
	}

	.row-header.good {
		box-shadow: inset 4px 0 0 #39f08a;
	}

	.row-header.bad {
		box-shadow: inset 4px 0 0 #ff5c5c;
	}

	.col-header.good {
		box-shadow: inset 0 -4px 0 #39f08a;
	}

	.cell {
		display: grid;
		place-items: center;
		background: #101010;
		color: #fff;
		font-size: clamp(0.58rem, 1vw, 0.78rem);
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}

	.cell[data-value='2'] {
		background: #1f7a34;
	}

	.cell[data-value='0.5'] {
		background: #7a2e2e;
	}

	.cell[data-value='0'] {
		background: #2b2b2b;
		color: #9a9a9a;
	}

	.cell.dim {
		opacity: 0.28;
	}

	.cell.row-hot,
	.cell.col-hot {
		opacity: 1;
	}

	.cell.row-hot {
		box-shadow:
			inset 0 1px 0 #fff,
			inset 0 -1px 0 #fff,
			inset 0 0 0 999px rgba(255, 255, 255, 0.14);
	}

	.cell.col-hot {
		box-shadow:
			inset 1px 0 0 #fff,
			inset -1px 0 0 #fff,
			inset 0 0 0 999px rgba(255, 255, 255, 0.14);
	}

	.cell.row-hot.col-hot {
		box-shadow:
			inset 0 0 0 2px #fff,
			inset 0 0 0 999px rgba(255, 255, 255, 0.28);
	}

	.col-header:focus-visible,
	.row-header:focus-visible,
	.modes button:focus-visible,
	.chip:focus-visible,
	.clear:focus-visible {
		outline: 2px solid #fff;
		outline-offset: -2px;
	}

	@media (max-width: 800px) {
		.results {
			grid-template-columns: 1fr;
		}

		.legend {
			margin-left: 0;
		}
	}
</style>
