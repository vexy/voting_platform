<script lang="ts">
    import { Utilities } from "$lib/Utilities";
    const utils = new Utilities();

    // MetaMask requires requesting permission to connect users accounts
    async function startWalletConnect() {
        await utils.connectWallet();
    }
</script>

<nav>
    <button on:click={startWalletConnect}>
        Повежи свој MetaMask
    </button>
    <button on:click={utils.beginMetamaskOnboarding}>
        Инсталирај MetaMask
    </button>
</nav>

<style>
    nav {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-end;
        padding: 5px;
        background-image: linear-gradient(to top, #c79081 0%, #dfa579 100%);
        /* background-image: linear-gradient(to top, #a3bded 0%, #6991c7 100%); */
        /* background: deepskyblue; */
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

    @media all and (max-width: 800px) {
        nav {
            /* When on medium sized screens, we center it by evenly distributing empty space around items */
            justify-content: space-around;
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