<script lang="ts">
    import { goto } from "$app/navigation";
    import Contract from "$lib/Utilities";
    import { Provider } from "$lib/Provider";
    import { PlatformStore } from "./UtilsStore";
    // import { onMount } from "svelte";

    // onMount(async () => {
    //     console.log("Header mounted.");
    // });

    // MetaMask requires requesting permission to connect users accounts
    async function disconnect() {
        Provider.disconnect();
        goto("/");  //go back to root
    }
</script>

<nav>
    {#if $PlatformStore.hasMetamask}
        {#if $PlatformStore.isConnected}
            <button on:click={disconnect}>
                Прекини употребу
            </button>
            {#if $PlatformStore.isRegistered}
                {#await Contract.getUserBalance() then totalPoints}
                    <div>Број поена: <code>{Number(totalPoints).toLocaleString()}</code></div>
                {/await}
                {#await Provider.signerAddress() then address}
                    <div>Новчаник: <code>{address}</code></div>
                {/await}
            {:else}
                <div><i>Регистрyj се за детаље</i></div>
            {/if}
        {/if}
    {/if}
</nav>

<style>
    nav {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        padding: 5px;
        background-image: linear-gradient(to right, #c09a81 0%, #dfa579 100%);
        /* background: deepskyblue; */
    }

    div {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: small;
        margin: 10px;
    }

    code {
        color: yellow;
        padding: 1.5px;
        background: rgb(172, 171, 171);
        border-radius: 5px;
    }

    code:hover {
        color: whitesmoke;
        font-weight: bolder;
    }

    button {
        min-width: 130px;
        height: 40px;
        color: #fff;
        padding: 5px 10px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        display: inline-block;
        outline: none;
        border-radius: 5px;
        border: none;
        box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1);
        background: #d90427d6;
    }

    button:hover {
        background-color: #ef233c;
        font-size: small;
    }

    button:active {
        top: 2px;
    }

    @media all and (max-width: 800px) {
        nav {
            /* When on medium sized screens, we center it by evenly distributing empty space around items */
            justify-content: space-around;
            background-image: linear-gradient(to left, #c0eeb5 25%, #015a3c 100%);
        }
    }

    /* Small screens */
    @media all and (max-width: 500px) {
        nav {
            /* On small screens, we are no longer using row direction but column */
            flex-direction: column;
        }
    }
</style>