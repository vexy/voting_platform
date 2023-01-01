<script lang="ts">
    import { Provider } from "$lib/Provider";

    async function configureMumbai() {
        const response = await Provider.configureMumbaiNetwork();
        if(response) {
            console.log("Mumbai network successfully added.");
        }
    }

    async function getTestMATIC() {
        window.open('https://mumbaifaucet.com/', '_blank', 'noreferrer');
    }
</script>

<h3>⚙️ Подешавања</h3>
<hstack>
    <button class="mumbai-button" on:click={configureMumbai}>
        Додај Mumbai мрежу
    </button>

    <button class="mumbai-button" on:click={getTestMATIC}>
        Набави MATIC токене
    </button>
</hstack>
<div>
    <p>У колико нисте, додајте <i>Mumbai мрежу</i> у Ваш MetaMask.</p>
    <p>За употребу платформе, потребно је набавити <code>MATIC</code> токене</p>
</div>

<style>
    div {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 12px;
        /* color: #63e742; */
    }

    h3 {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    hstack {
        display: flex;
        flex-direction: row;
        align-content: center;
    }

    .mumbai-button {
        min-width: 130px;
        height: 35px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 5px;
        border: none;
        background-size: 120% auto;
        background-image: linear-gradient(315deg, #833ab4 0%, #fa3636 50%, #fcb045);
        margin: 2px 5px 5px 15px;
    }

    .mumbai-button:hover {
        background-position: right center;
        padding: 5px 10px;
    }

    .mumbai-button:active {
        top: 2px;
    }
</style>