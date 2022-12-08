<script lang="ts">
    import Providers from "$lib/Provider";
    import Utilities from "$lib/Utilities";
    import Provider from "$lib/Provider";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { hasMetamaskProvider, isProviderConnected, isRegisteredUser } from "$lib/UtilsStore";

    let hasMetamask: boolean = false;
    let isConnected: boolean = false;
    let isRegistered: boolean = false;

    hasMetamaskProvider.subscribe(newValue => {
        hasMetamask = newValue;
    });

    isProviderConnected.subscribe(newValue => {
        isConnected = newValue;
    });

    isRegisteredUser.subscribe(nVal => {
        isRegistered = nVal;
    });

    async function registerNewUser() {
        // check if we've been previously registered
        const response = await Utilities.registerNewUser()
        if (response) {
            alert("Успешно сте се пријавили на платформу !");
            console.log("New user registered !");
            goto("/list");
        } else {
            alert("Дошло је до грешке приликом регистрације. Покушајте поново.");
        }
    }

    // MetaMask requires requesting permission to connect users accounts
    async function connectToMetamask() {
        await Utilities.connect();
    }

    onMount(async () => {
        await Provider.hasMetamaskProvider();
		console.log("Main page mounted...");
    });
</script>

<center-container>
    <h1>100 људи 100 ћуди</h1>
    {#if hasMetamask}
        {#if isConnected}
            {#if isRegistered}
                <button class="gradient_button" on:click={() => goto("/list")}>Погледај листу питања</button>
            {:else}
                <button class="gradient_button" on:click={registerNewUser}>
                    Пријава на платформу ✌️
                </button>
                {#await Utilities.totalUsers()}
                    <i>Komunikacija u toku...</i>
                {:then totalUserNum} 
                    <code>Broj registrovanih korisnika: {totalUserNum}</code>
                {/await}
                {#await Utilities.questionsCount()}
                    <i>Komunikacija u toku...</i>
                {:then count} 
                    <code>Broj pitanja: {count}</code>
                {/await}
            {/if}
        {:else}
            <button on:click={connectToMetamask}>
                Повежи MetaMask
            </button>
            <code>За почетак употребе, повежите Ваш <i>MetaMask</i> новчаник...</code>
        {/if}
        
        <!-- dodaj test tokene  -->
    {:else}
        <button on:click={Providers.beginMetamaskOnboarding}>
            Инсталирај MetaMask
        </button>

        <code>За употребу платформе, потребно је инсталирати <a href="https://metamask.io/" target="_blank">MetaMask</a></code>
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

    h1 {
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        color: #185a9d;
    }

    h1:hover {
        font-weight: bolder;
        color: #ffdd;
        transition: all 0.2s ease-out;
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
</style>