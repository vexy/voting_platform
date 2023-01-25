<script lang="ts">
    import Contract from "$lib/Utilities";
    import { Provider, ProviderCommons } from "$lib/Provider";
    import { PlatformStore } from "$lib/UtilsStore";
    import EasyConfigPanel from "$lib/EasyConfigPanel.svelte";
    import Instructions from "$lib/Instructions.svelte"
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let usersCount: number = 0;
    const metamask_logo = new URL('./assets/metamask.svg', import.meta.url).href

    async function performRegistration() {
        // check if we've been previously registered
        const response = await Contract.registerNewUser()
        if (response) {
            alert("Успешно сте се пријавили на платформу !");
            console.log("New user registered !");
            // update other platform fields
            fetchPlatformInfo(true);
            goto("/list");
        } else {
            alert("Дошло је до грешке приликом регистрације. Покушајте поново.");
        }
    }

    async function fetchPlatformInfo(fetchBalance?: boolean) {
        await Contract.questionsCount();
        usersCount = await Contract.totalUsers();
        if(fetchBalance) { await Contract.getUserBalance(); }
    }

    // MetaMask requires requesting permission to connect users accounts
    async function connectMetamask() {
        const success = await Provider.connectToMetamask();
        if(success) {
            // update other fields
            fetchPlatformInfo();
        }
    }

    onMount(async () => {
        await ProviderCommons.startMetamaskCheck();
        // console.log("MainPage mounted, provider check completed.");
    });
</script>

<page-container>
    <h1>100 људи 100 ћуди</h1>

    {#if $PlatformStore.hasMetamask}
        {#if $PlatformStore.isConnected}
            {#await Contract.isRegisteredUser() then success }
                {#if success}
                    <button class="gradient-button" on:click={() => goto("/list")}>🔍 Погледај листу питања</button>
                    <p>Број постављених питања: {$PlatformStore.totalQuestions}</p>
                {:else}
                    <button class="gradient-button" on:click={performRegistration}>
                        Хоћу и ја ✌️
                    </button>
                {/if}
                <p>Регистровани корисникa: {usersCount}</p>
            {/await}
        {:else}
            <button class="metamask-button" on:click={connectMetamask}>
                Повежи MetaMask
            </button>
            <span>Повежите Ваш <i>MetaMask</i> новчаник како бисте приступили платформи...</span>

            <!-- SECTION FOR CONFIGURING  -->
            <EasyConfigPanel />
        {/if}
    {:else}
        <Instructions />
    {/if}
</page-container>

<style>
    page-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    span {
        font-size: 14px;
        background-image: linear-gradient(to right, #c78513 0%, #fff 100%);
        background-clip: text;

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent; 
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
    }

    h1 {
        color: #185a9d;
    }

    h1:hover {
        font-weight: bolder;
        background-image: linear-gradient(to bottom right, #fffd 25%, #1170d0 80%);
        background-clip: text;

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent; 
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
        transition: all 0.2s ease-out;
    }

    .metamask-button {
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

    .metamask-button:hover {
        background-position: right center;
        padding: 5px 10px;
    }

    .gradient-button {
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
    .gradient-button:hover {
        background-position: right center;
        color: #fff9;
        font-weight: initial;
    }
    .gradient-button:active {
        top: 2px;
    }
</style>