<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import TimeContract from '$lib/components/TimeContract.svelte';
	import type { AnyProp } from '$lib/types';
	import { timeFromNow } from '$lib/utils/helpers';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	function generateRandomDate(start: Date, end: Date): Date {
		return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	}
	const startDate = new Date('2022-01-01');
	const endDate = new Date();
	let trains = transformData(data)

	function transformData(data) {

		let trains = data.response.map((train: [string, string, string]) => ({
			id: train[0],
			name: train[1],
			logo: `https://picsum.photos/100/100?random=${Math.random()}`,
			description: 'A premier express train connecting cities with speed and comfort.',
			created_at: generateRandomDate(startDate, endDate).toISOString(),
			// contract: 'Full Time',
			position: 'Train Operator',
			company: 'Indian Railways',
			location: 'Various Locations'
		}));

		return trains
	}

	let hasSearchResults = true;
	let isSearching: any = false;
	let errorMessage = '';

	$: isSearching, hasSearchResults, trains

	const handleSearch = async (e: CustomEvent) => {
		isSearching = true
		const searchTerm = e.detail.searchTerms.position
		if (!searchTerm) {

		}
		let searchLink = `https://search.railyatri.in/mobile/trainsearch?callback=&q=${searchTerm}`
		try {
			const result = await fetch(searchLink);

			const response = await result.json();
			console.log(response)
			if (response.length > 0) {
				isSearching = false
				trains = transformData({response})

			} else {
				hasSearchResults = false
			}
		} catch (err) {
			console.log("Request failed", err)
			hasSearchResults = false
		}
	};
</script>

<SearchBar on:search={handleSearch} />

<section>
	{#if trains.length !== 0 && !isSearching}
		<ul class="job-list">
			{#each trains as train}
				<li style:--logoBg={train.logoBackground}>
					<a href="/" class="job-card">
						<picture>
							<img src={train.logo} alt="{train.id} logo" />
						</picture>

						<TimeContract>
							<span slot="time">{timeFromNow(train.created_at)}</span>
							<span slot="contract">{train.id}</span>
						</TimeContract>
						<Heading as="h2" type="h3">{train.name}</Heading>
						<p>{train.name}</p>
						<strong>{train.name}</strong>
					</a>
				</li>
			{/each}
		</ul>

		{#if errorMessage}
			<span style="color: red;">{errorMessage}</span>
		{/if}

	{:else if isSearching}
		{#if !hasSearchResults}
		<span>No Trains found for this search terms</span>
		{:else}
		<span>Searching...</span>
		{/if}
	{:else}
		<span>No Trains found for this search terms</span>
	{/if}
</section>

<style lang="scss">
	@use '$lib/scss/mixins' as *;

	section {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		& > :global(button) {
			align-self: center;
		}

		@include md-bp {
			gap: 3.5rem;
		}
	}

	.job-list {
		list-style: none;
		margin-top: 3.563rem;
		padding: 0;
		display: grid;
		grid-template-rows: repeat(auto-fill, minmax(14.25rem, 1fr));
		row-gap: 3.063rem;

		@include md-bp {
			grid-template-columns: repeat(auto-fit, minmax(24.438rem, 1fr));
			column-gap: 0.688rem;
			margin-top: 4.375rem;
		}

		@include lg-bp {
			column-gap: 1.875rem;
		}
	}

	.job-card {
		position: relative;
		display: block;
		text-decoration: none;
		color: inherit;
		background-color: var(--accentBg);
		padding: 3.063rem 2rem 2rem 2rem;
		border-radius: 0.375rem;
		height: 100%;

		& picture {
			position: absolute;
			top: -1.5625rem;
			display: grid;
			place-content: center;
			place-items: center;
			border-radius: 0.938rem;
			background-color: var(--logoBg);
			height: 3.125rem;
			width: 3.125rem;
		}

		& > :global(:not(p)) {
			margin-bottom: 1rem;
		}

		& > p {
			margin-bottom: 2.563rem;
		}

		& > :last-child {
			color: var(--primary);
		}

		& > :global(*) {
			display: block;
		}
	}

	picture img {
		border-radius: 14px;
	}
</style>
