<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	import { auth } from '$lib/store';
	import Icon from './Icon.svelte';
	import IconButton from './IconButton.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';

	let menuIsOpen = false;

	const openMenu = () => (menuIsOpen = true);
	const closeMenu = () => (menuIsOpen = false);

	const keydownCloseMenu = (e: KeyboardEvent) => {
		if (e.code === 'Enter') {
			closeMenu();
		}
	};
</script>

<header>
	<div class="container app-bar">
		<a class="title" href="/"><h1>Spectran</h1></a>

		<nav class="menu">
			{#if $auth}
				<a href="/dashboard" class="nav-link">Dashboard</a>
				<a href="/auth/sign-out" class="nav-link">Sign out</a>
			{:else}
				<a href="/auth/sign-in" class="nav-link">Sign in</a>
				<a href="/auth/sign-up" class="nav-link">Sign up</a>
			{/if}

			<ThemeSwitcher />
		</nav>

		<span class="menu-btn">
			<IconButton on:click={openMenu} name="hamburger" color="white" />
		</span>

		{#if menuIsOpen}
			<div
				on:keydown={keydownCloseMenu}
				on:click={closeMenu}
				transition:fade={{ easing: cubicOut }}
				class="mobile-menu"
			>
				<div on:keydown|stopPropagation on:click|stopPropagation class="content">
					<nav class="menu">
						<IconButton on:click={closeMenu} name="cross" color="white" />
						{#if $auth}
							<a href="/dashboard" class="nav-link">Dashboard</a>
							<a href="/auth/sign-out" class="nav-link">Sign out</a>
						{:else}
							<a href="/auth/sign-in" class="nav-link">Sign in</a>
							<a href="/auth/sign-up" class="nav-link">Sign up</a>
						{/if}

						<ThemeSwitcher />
					</nav>
				</div>
			</div>
		{/if}
	</div>
</header>

<style lang="scss">
	@use '$lib/scss/mixins' as *;



	header {
		background-image: url(/assets/mobile/bg-pattern-header.svg);
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		padding-block: 2rem 4.5rem;
		color: hsl(0 0% 100%);

		@include md-bp {
			background-image: url(/assets/tablet/bg-pattern-header.svg);
			background-position: left;
			padding-block: 2.625rem 5.375rem;
		}

		@include lg-bp {
			background-image: url(/assets/desktop/bg-pattern-header.svg);
			background-position: left;
			padding-block: 2.813rem 5.313rem;
		}
	}

	.menu {
		display: none;

		@include md-bp {
			display: flex;
			gap: 2rem;
		}
	}

	.mobile-menu {
		position: fixed;
		inset: 0;
		background-color: hsl(0 0% 0% / 0.5);
		z-index: 2;

		.content {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			width: 70%;
			max-width: 25rem;
			background-color: var(--primary);
			color: hsl(0 0% 100%);
			padding: 1.5rem;

			.menu {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				gap: 1.5rem;
			}
		}
	}

	.menu-btn,
	.mobile-menu {
		@include md-bp {
			display: none;
		}
	}

	.nav-link {
		color: inherit;
		text-decoration: none;
		font-weight: 500;
	}

	.app-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.title {
		color:white;
	}
</style>
