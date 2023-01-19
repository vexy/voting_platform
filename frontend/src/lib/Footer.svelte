<script lang="ts">
    import { PlatformStore } from "$lib/UtilsStore";
</script>

<footer>
    {#if $PlatformStore.isConnected}
        <div>Made with ❤️ in 🇷🇸</div>
        <div>Регистрованих корисника: <code>{$PlatformStore.totalUsers}</code></div>
        <div>Број питања: <code>{$PlatformStore.totalQuestions}</code></div>
    {:else}
        <code>Version: 1.1</code>
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
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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