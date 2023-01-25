<svelte:head>
    <title>Infoportal.app | Home</title>
    <meta name="description" content="Infoportal.app place to publish your questions, answers, thouts and opinions. Blochain based." />
</svelte:head>

<script lang="ts">
	import Header from "$lib/Header.svelte";
	import Footer from "$lib/Footer.svelte";
</script>

<main-container>
	<Header />
	<main-content>
		<slot />
	</main-content>
	<Footer />
</main-container>

<style>
    main-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100vw; 
        height: 100vh;
        background-image: linear-gradient(to top, #a3bded 0%, #6991c7 100%);
		/* background-image: linear-gradient(to top, #c79081 0%, #dfa579 100%); */
        /* background-image: linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%); */

		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	main-content {
		margin-inline: 5px;
		overflow-y: auto;
    }

	@media (min-width: 640px) {
		main-container {
			background-image: linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%);
			max-width: none;
			max-height: none;
		}
	}

	@media (min-width: 280px) {
		main-container {
			max-width: none;
			max-height: none;
		}
	}
</style>
