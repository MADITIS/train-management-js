<script lang="ts">

	import '$lib/scss/globals.scss';

	import Header from '$lib/components/Header.svelte';
	import ThemeProvider from '$lib/components/ThemeProvider.svelte';

	let loading = false;

</script>

<ThemeProvider>
	{#if loading}
		<span>loading...</span>
	{:else}
		<Header />
		<main class="container">
			<slot />
		</main>
	{/if}
</ThemeProvider>
