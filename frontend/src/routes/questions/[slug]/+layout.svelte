<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from "$app/stores";

    onMount(async () => {
        //perform loadup procedure here
    });
</script>

<h1>Your title goes here !</h1>

<div>{$page.params.slug}</div>

<div>This is just another DIV</div>