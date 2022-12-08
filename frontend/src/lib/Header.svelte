<script lang="ts">
    import { goto } from "$app/navigation";
    import Utilities from "$lib/Utilities";
    import { hasMetamaskProvider, isProviderConnected } from "./UtilsStore";

    let providerPresent: boolean = false;
    let metamaskConnected: boolean = false;

    hasMetamaskProvider.subscribe(newValue => {
        providerPresent = newValue;
    });

    isProviderConnected.subscribe(newValue => {
        metamaskConnected = newValue;
    });

    // MetaMask requires requesting permission to connect users accounts
    async function disconnect() {
        Utilities.disconnect();
        console.log("Disconnected... Going back to the root.");
        goto("/");  //go back to root
    }
</script>

<nav>
    {#if providerPresent}
        {#if metamaskConnected}
            <button on:click={disconnect}>
                Прекини употребу
            </button>
            {#await Utilities.isRegisteredUser()}
                <i>Комуникација са платформом...</i>
            {:then success}
                {#if success}
                    {#await Utilities.getUserBalance() then totalPoints}
                        <div>Број поена: <code>{Number(totalPoints).toLocaleString()}</code></div>
                    {/await}
                    {#await Utilities.signerAddress() then address}
                        <div>Новчаник: <code>{address}</code></div>
                    {/await}
                {:else}
                    <i>Регистрација у току...</i>
                {/if}
            {/await}
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
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
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