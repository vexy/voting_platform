<script>
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
	import MainPanel from "./MainPanel.svelte";
	import WalletConnect from "./WalletConnect.svelte";
	import AllPolls from "./AllPolls.svelte";
	import MetaMaskOnboarding from '@metamask/onboarding';

	function hasMetamaskInstalled() {
		console.log("Metamask installed: ", MetaMaskOnboarding.isMetaMaskInstalled());
		return MetaMaskOnboarding.isMetaMaskInstalled();
	}
</script>

<main>
	<Header />
	<div class="flex-items">
		<blockquote>Welcome to the simple voting platform</blockquote>
		<p>Choose one of the options below</p>
		<!-- check if browser plugin has been installed -->	
		{#if hasMetamaskInstalled()} 
			<MainPanel />
		{:else}
			<MainPanel />
			<WalletConnect />
			<AllPolls />
		{/if}
	</div>
	<Footer/>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	.flex-items:nth-child(1) {
		display: block;
		flex-grow: 0;
		flex-shrink: 1;
		flex-basis: auto;
		align-self: auto;
		order: 0;
		height: 100%;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>