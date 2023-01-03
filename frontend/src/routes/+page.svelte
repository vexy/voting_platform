<svelte:head>
    <title>Welcome to Infoportal.app</title>
    <meta name="description" content="Infoportal.app place to publish your questions, answers, thouts and opinions. Blochain based." />
</svelte:head>

<script lang="ts">
    import Contract from "$lib/Utilities";
    import { Provider, ProviderCommons } from "$lib/Provider";
    import { PlatformStore } from "$lib/UtilsStore";
    import EasyConfigPanel from "$lib/EasyConfigPanel.svelte";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let usersCount: number = 0;

    async function performRegistration() {
        // check if we've been previously registered
        const response = await Contract.registerNewUser()
        if (response) {
            alert("Успешно сте се пријавили на платформу !");
            console.log("New user registered !");
            // update other platform fields
            fetchPlatformInfo();
            goto("/list");
        } else {
            alert("Дошло је до грешке приликом регистрације. Покушајте поново.");
        }
    }

    async function fetchPlatformInfo() {
        await Contract.questionsCount();
        usersCount = await Contract.totalUsers();
        await Contract.getUserBalance();
    }

    // MetaMask requires requesting permission to connect users accounts
    async function connectMetamask() {
        const success = await Provider.connectToMetamask();
        if(success) {
            // update other fields
            await Contract.questionsCount();
            usersCount = await Contract.totalUsers();
        }
    }

    onMount(async () => {
        await ProviderCommons.startMetamaskCheck();
        // console.log("MainPage mounted, provider check completed.");
    });
</script>

<center-container>
    <h1>100 људи 100 ћуди</h1><br>

    {#if $PlatformStore.hasMetamask}
        {#if $PlatformStore.isConnected}
            {#await Contract.isRegisteredUser() then success }
                {#if success}
                    <button class="gradient-button" on:click={() => goto("/list")}>Погледај листу питања 🔍</button>
                {:else}
                    <button class="gradient-button" on:click={performRegistration}>
                        Хоћу и ја ✌️
                    </button>
                    <div>
                        <p>Регистровани корисникa: {usersCount}</p>
                    </div>
                {/if}
            {/await}
        {:else}
            <!-- <code>За почетак употребе, повежите Ваш <i>MetaMask</i> новчаник...</code> -->
            <button class="metamask-button" on:click={connectMetamask}>
                Повежи MetaMask
            </button>
            <code>За почетак употребе, повежите Ваш <i>MetaMask</i> новчаник...</code>

            <!-- SECTION FOR CONFIGURING  -->
            <EasyConfigPanel />
        {/if}
    {:else}
        <button class="metamask-button" on:click={ProviderCommons.beginMetamaskOnboarding}>
            Инсталирај MetaMask
        </button>
        <code>За употребу платформе, потребно је инсталирати <a href="https://metamask.io/" target="_blank" rel="noreferrer">MetaMask</a></code>

        <!-- READ MORE BUTTON  -->
    {/if}
</center-container>

<style>
    center-container {
        display: flex;
        flex-direction: column;
        align-self: center;
        text-align: center;
        gap: 5px;
    }

    h1 {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: #185a9d;
    }

    h1:hover {
        font-weight: bolder;
        color: #ffdd;
        transition: all 0.2s ease-out;
    }

    div {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 15px;
        color: #4d4fb1;
    }

    div:hover {
        color: #4d4f81;
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