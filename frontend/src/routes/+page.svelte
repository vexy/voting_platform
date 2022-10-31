<script lang="ts">
    import WelcomePanel from "$lib/WelcomePanel.svelte";
    import { onMount } from "svelte";

    onMount(async () => {
        // Check if we have provider
        console.log("Main page mounted, will check for provider here !");
    });
</script>

<WelcomePanel />
