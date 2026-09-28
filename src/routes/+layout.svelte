<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Type Chart</title>
	<meta name="description" content="Pokémon type damage chart" />
</svelte:head>

{@render children()}
