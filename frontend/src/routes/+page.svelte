<script lang="ts">
    import detectEthereumProvider from "@metamask/detect-provider";
    import { Utilities } from "$lib/Utilities";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    const util = new Utilities();
    let hasProvider: boolean = false;

    // MetaMask requires requesting permission to connect users accounts
    async function startWalletConnect() {
        await util.connectWallet();
        util.registerNewUser()
            .then( (succes) => {
                alert("Sucessfully registered");
                console.log("User registered !");
                goto("list");
            });
    }

    onMount(async () => {
        console.log("Checking if provider can be detected....");

        const response = await detectEthereumProvider();
        if (response) {
            hasProvider = true;
        }
    });
</script>

<center-container>
    <h1>100 људи 100 ћуди</h1>
    {#if hasProvider}
        {#await util.isRegisteredUser()}
            <i>Komunikacija u toku...</i>
        {:then success}
            {#if success}
                <button class="gradient_button" on:click={() => {goto("list");}}>
                    Хоћу и ја ✌️
                </button>
                {#await util.totalUsers() then totalUsers}
                    <code>Ukupno korisnika: {totalUsers}</code>
                {/await}
            {:else}
                <button on:click={startWalletConnect}>
                    Повежи свој MetaMask
                </button>
            {/if}
        {/await}
    {:else}
        <button on:click={util.beginMetamaskOnboarding}>
            Инсталирај MetaMask
        </button>
        <code>Za upotrebu platforme, potrebno je instalirati <a href="https://metamask.io/" target="_blank">MetaMask</a></code>
    {/if}
</center-container>

<style>
    center-container {
        display: flex;
        flex-direction: column;
        align-self: center;
        text-align: center;
        gap: 10px;
    }

    button {
        min-width: 130px;
        height: 35px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 5px;
        border: none;
        background-size: 120% auto;
        background-image: linear-gradient(315deg, #c02425 0%, #f0cb35 75%);
        margin: 2px 5px 5px 15px;
    }

    button:hover {
        background-position: right center;
        padding: 5px 10px;
    }

    .gradient_button {
        min-width: 130px;
        height: 40px;
        color: #fff;
        font-weight: bold;
        transition: all 0.3s ease;
        position: relative;
        display: inline-block;
        outline: none;
        border-radius: 5px;
        border: none;
        background-size: 120% auto;
        background-image: linear-gradient(315deg, #43cea2 0%, #185a9d 75%);
    }
    .gradient_button:hover {
        background-position: right center;
        color: #fff9;
        font-weight: initial;
    }
    .gradient_button:active {
        top: 2px;
    }

    h1 {
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        color: #185a9d;
    }

    h1:hover {
        font-weight: bolder;
        color: #ffdd;
        transition: all 0.2s ease-out;
    }
</style>