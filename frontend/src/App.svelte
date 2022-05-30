<script>
	import WalletConnect from "./WalletConnect.svelte";
	import AnotherComponent from "./AnotherComponent.svelte";
	import MetaMaskOnboarding from '@metamask/onboarding';

	function hasMetamaskInstalled() {
		console.log("Metamask installed: ", MetaMaskOnboarding.isMetaMaskInstalled());
		return MetaMaskOnboarding.isMetaMaskInstalled();
	}
</script>

<main>
	<h1>Simple voting platform</h1>

	<!-- check if browser plugin has been installed -->	
	{#if hasMetamaskInstalled()} 
		<AnotherComponent />
	{:else}
		<AnotherComponent />
		<WalletConnect />
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e10;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>