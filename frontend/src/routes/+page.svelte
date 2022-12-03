<script lang="ts">
    import detectEthereumProvider from "@metamask/detect-provider";
    import Utilities from "$lib/Utilities";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let hasProvider: boolean = false;
    let hasConectedMetamask: boolean = false;

    // MetaMask requires requesting permission to connect users accounts
    async function connectMetaMask() {
        const reply = await Utilities.connectToMetamask();
        if (reply) {
            //indicate metamask has been connected
            hasConectedMetamask = true;
        } else {
            //TODO: Remove next line after testing
            hasConectedMetamask = true;
            Utilities.connectLocally();
        }
    }

    async function registerNewUser() {
        // check if we've been previously registered
        if (!Utilities.isRegisteredUser()) {
            const response = await Utilities.registerNewUser()
            if (response) {
                alert("Успешно сте се пријавили на платформу !");
                console.log("New user registered !");
                goto("/list");
            } else {
                alert("Doslo je do greske prilikom registracije. Pokusajte ponovo");
            }
        } else {
            // navigate directly to the list route
            goto("/list");
        }
    }

    onMount(async () => {
        console.log("Checking if provider can be detected....");

        const response = await detectEthereumProvider();
        if (response) {
            hasProvider = true;
            console.log("Detected Metamask provider....");
        } else { console.log("Unable to find Metamask provider"); }
    });
</script>

<center-container>
    <h1>100 људи 100 ћуди</h1>
    {#if hasProvider}
        {#if hasConectedMetamask}
            <button class="gradient_button" on:click={registerNewUser}>
                Хоћу и ја ✌️
            </button>
            {#await Utilities.totalUsers()}
                <i>Комуникација у току...</i>
            {:then totalUsers}
                <code>Укупно корисника: {totalUsers}</code>
            {/await}
        {:else}
            <button on:click={connectMetaMask}>
                Повежи свој MetaMask
            </button>
        {/if}
    {:else}
        <button on:click={Utilities.beginMetamaskOnboarding}>
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