<script lang="ts">
    import { isProviderConnected } from "$lib/UtilsStore";
    import Utilities from "$lib/Utilities";

    let isConnected: boolean = false;
    //
    isProviderConnected.subscribe(newValue => {
        isConnected = newValue;
    });
</script>

<footer>
    {#if isConnected}
        {#await Utilities.totalUsers()}
            <i>Koмуникација у току...</i>
        {:then totalUserNum} 
            <div>Регистрованих корисника: <code>{totalUserNum}</code></div>
        {/await}
        <div>Made with ❤️ in 🇷🇸</div>
        {#await Utilities.questionsCount()}
            <i>Koмуникација у току...</i>
        {:then count} 
            <div>Број питања: <code>{count}</code></div>
        {/await}
    {:else}
        <code>public-beta v0.8</code>
        <div>Made with ❤️ in 🇷🇸</div>
    {/if}
</footer>

<style>
    footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        background-image: linear-gradient(90deg, #ccc8ea 0%, #989ce8 50%, #ccc8e0);
    }

    footer div {
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size: 12px;
        color: #140773;
        /* padding-right: 15px; */
    }

    code {
        background-color: #989ce8;
        border-radius: 1.5px;
    }

    /* Small screens */
    @media all and (max-width: 500px) {
        footer {
            flex-direction: column;
            gap: 2.5px;
            background-image: linear-gradient(90deg, #230adf 33%, #5f618b 100%);
        }

        footer div {
            color: rgba(255, 255, 255, 0.665);
        }
    }
</style>