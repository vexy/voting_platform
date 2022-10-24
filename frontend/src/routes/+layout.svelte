<script lang="ts">
	import ProviderToolbar from "$lib/ProviderToolbar.svelte";
	import WelcomePanel from "$lib/WelcomePanel.svelte";
	import QuestionsList from "$lib/QuestionsList.svelte";
	import Footer from "$lib/Footer.svelte";
	import { Utilities } from "$lib/Utilities";
	
</script>
<!-- Place to enter other Svelte pages -->

<main>
	<ProviderToolbar />
	<QuestionsList />
	<!-- <Header /> -->
	<!-- <WelcomePanel /> -->
	<!-- <slot />	+page.svelte -->
	<!-- <Footer /> -->
</main>


<style>
    main {
		position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        align-items: center;
        background-image: linear-gradient(to top, #a3bded 0%, #6991c7 100%);
		/* background-image: linear-gradient(to top, #c79081 0%, #dfa579 100%); */
        /* background-image: linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%); */
        height: auto !important;
        -webkit-flex-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        z-index: -1;
	}

	@media (min-width: 640px) {
		main {
			background-image: linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%);
			max-width: none;
			max-height: none;
		}
	}

	@media (min-width: 280px) {
		main {
			max-width: none;
			max-height: none;
		}
	}
</style>
