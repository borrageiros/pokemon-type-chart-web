<script lang="ts">
	let { id }: { id: string } = $props();
</script>

<svg class="type-icon" viewBox="0 0 24 24" aria-hidden="true">
	{#if id === 'normal'}
		<circle cx="12" cy="12" r="7.2" fill="none" stroke="currentColor" stroke-width="2.4" />
		<circle cx="12" cy="12" r="2.3" fill="currentColor" />
	{:else if id === 'fire'}
		<path
			fill="currentColor"
			d="M12.1 1.6c.6 3.1-1.5 4.7-1.4 7.6.1 1.1.6 2 1.4 2.5-.9-.7-1.5-1.8-1.3-3.2-2.2 2.1-4.3 4.5-4.3 7.7 0 3.8 2.9 6.4 6.4 6.4s6.3-2.6 6.3-6.5c0-4-3-6.6-4.3-9.2-.2 1.8.2 3.2 1.2 4.2.2-2.4-.2-4.2-1.2-6.2-.8-1.6-2.1-2.6-2.8-3.3z"
		/>
	{:else if id === 'water'}
		<path
			fill="currentColor"
			d="M12 2.2S5.2 9.4 5.2 14.4a6.8 6.8 0 0 0 13.6 0C18.8 9.4 12 2.2 12 2.2z"
		/>
	{:else if id === 'electric'}
		<path fill="currentColor" d="M13.6 1.5 4.2 13.2h6.2l-1.3 9.3L19.8 9.6h-6.4l.2-8.1z" />
	{:else if id === 'grass'}
		<path
			fill="currentColor"
			d="M19.8 4.2C12.4 3.6 5.4 9.2 4.4 17.2c-.2 1.6 1.2 2.6 2.4 1.8 2.2-1.6 3.6-1.8 5.4-1.2-1.6 2.2-1.2 3.8.6 3.8 6.4 0 11.2-6.6 10.6-14.2-.1-1.4-1.6-2.4-3.6-3.2z"
		/>
	{:else if id === 'ice'}
		<g
			fill="none"
			stroke="currentColor"
			stroke-width="2.2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M12 2.5v19M4.2 7l15.6 10M19.8 7 4.2 17" />
			<path d="M12 7.2 9.6 5.4M12 7.2l2.4-1.8M12 16.8 9.6 18.6M12 16.8l2.4 1.8" />
			<path d="M7.4 9.2 5.2 8.2M7.4 9.2 6.6 11.6M16.6 14.8l2.2 1M16.6 14.8l.8-2.4" />
			<path d="M16.6 9.2 18.8 8.2M16.6 9.2l.8 2.4M7.4 14.8 5.2 15.8M7.4 14.8 6.6 12.4" />
		</g>
	{:else if id === 'fighting'}
		<path
			fill="currentColor"
			d="M8.2 9.2V6.4a1.7 1.7 0 0 1 3.4 0V10h.2V5.6a1.7 1.7 0 0 1 3.4 0V11h.2V7.4a1.6 1.6 0 0 1 3.2.4V14c0 3.4-2.6 6.2-6.4 6.2h-1.6C7 20.2 4.6 17.6 4.6 14.2v-2.6a1.7 1.7 0 0 1 3.2-.8c.1.2.2.3.4.4z"
		/>
	{:else if id === 'poison'}
		<circle cx="8.2" cy="15.2" r="3.6" fill="currentColor" />
		<circle cx="15.4" cy="15.6" r="3.1" fill="currentColor" />
		<circle cx="12" cy="8.4" r="3.5" fill="currentColor" />
	{:else if id === 'ground'}
		<path fill="currentColor" d="M2.4 18.6 7.6 9.2l3.6 4.4 3.2-6.2 3.4 4.8 3.8-3.2v9.6H2.4z" />
		<path fill="currentColor" d="M2 20.2h20v1.6H2z" />
	{:else if id === 'flying'}
		<path
			fill="currentColor"
			d="M3.2 13.6C7.2 12.8 9.4 8.2 11.2 4.2c.8 4.4 3.4 7.2 8.8 8.2-3.6 1-5.6 2.6-6.6 5.4-2.6-1.6-5.4-2.8-10.2-4.2z"
		/>
	{:else if id === 'psychic'}
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M2.2 12S6.2 6.2 12 6.2 21.8 12 21.8 12 17.8 17.8 12 17.8 2.2 12 2.2 12zm9.8-3.2a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zm0 1.8a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"
		/>
	{:else if id === 'bug'}
		<path
			fill="currentColor"
			d="M12 8.2c1.6 0 2.8 1.1 3.1 2.6 1.8.5 3.1 2 3.1 3.9 0 2.4-2.1 4.3-4.8 4.6l.8 2.2h-2.2l-.6-1.8h-1.6l-.6 1.8H7.8l.8-2.2C5.9 19 3.8 17.1 3.8 14.7c0-1.9 1.3-3.4 3.1-3.9C7.2 9.3 8.4 8.2 10 8.2h.4L9.2 5.4 10.8 4.6 12 6.6l1.2-2 1.6.8-1.2 2.8h.4z"
		/>
		<path fill="currentColor" d="M8.6 13.2h6.8v1.6H8.6z" />
	{:else if id === 'rock'}
		<path fill="currentColor" d="M7.2 20.2 4.4 11.6 8.8 4.2h6.2l4.8 6.8-2.2 9.2H7.2z" />
	{:else if id === 'ghost'}
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M7 11.2a5 5 0 0 1 10 0V20l-1.7-1.6-1.6 1.6-1.7-1.6L10.3 20 8.7 18.4 7 20v-8.8zm2.3 1.2a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1zm5.2 0a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1z"
		/>
	{:else if id === 'dragon'}
		<path
			fill="currentColor"
			d="M4.2 16.4c1.2-3.6 3.4-6.4 6.4-7.6-.6 2.2-.2 3.8 1.2 4.8C10.6 8.8 12.4 5.2 16.6 3.2c-.8 2.6-.2 4.4 1.6 5.6 1.6.8 2.8 2.2 3.2 4-2.4.2-4-.6-5.4-1.8-.2 2.6-2.2 4.8-5.2 5.4-2.6.4-5-.4-6.6-.0z"
		/>
	{:else if id === 'dark'}
		<path fill="currentColor" d="M14.2 2.8A8.6 8.6 0 1 0 20.6 16 6.8 6.8 0 0 1 14.2 2.8z" />
	{:else if id === 'steel'}
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M12 2.4 19.6 6.8v8.8L12 20.4 4.4 15.6V6.8L12 2.4zm0 5.2a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8z"
		/>
	{:else if id === 'fairy'}
		<path
			fill="currentColor"
			d="M12 1.8 13.6 8.4 20.2 10 13.6 11.6 12 18.2 10.4 11.6 3.8 10 10.4 8.4 12 1.8zM18.2 14.2l.6 2.2 2.2.6-2.2.6-.6 2.2-.6-2.2-2.2-.6 2.2-.6.6-2.2z"
		/>
	{/if}
</svg>

<style>
	.type-icon {
		display: block;
		width: 0.95rem;
		height: 0.95rem;
		flex: none;
	}
</style>
