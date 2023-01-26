<script lang="ts">
    import { ProviderCommons } from "$lib/Provider";

    // define static assets
    const polygon_logo = new URL('./assets/polygon.png', import.meta.url).href

    let isExpanded: boolean = false;

    async function configureMumbai() {
        try {
            await ProviderCommons.configureMumbaiNetwork();
            alert("Mumbai мрежа је успешно додата !");
            // window.location.reload();
        } catch(e) {
            console.log("Errored: ", e);
        }
    }
</script>

<button class="blue-button" on:click={() => isExpanded = !isExpanded }>⚙️ Подешавање новчаника</button>
{#if isExpanded}
    <settings-container>
        <row>
            <button class="setup-button" on:click={configureMumbai}>
                <img src={polygon_logo} height="20" alt="polygon_logo" />
                <span>Додај Mumbai мрежу</span>
            </button>

            <span>Додајте параметре <i>Mumbai мреже</i> у Ваш MetaMask</span>
        </row>

        <row>
            <button class="setup-button" on:click={() => ProviderCommons.getTestMATIC()}>
                <img src={polygon_logo} height="20" alt="polygon_logo" />
                <span>Набави MATIC токене</span>
            </button>

            <span>Преузмите бесплатне <code>MATIC</code> токене са официјелног сајта</span>
        </row>
    </settings-container>
{:else}
    <p>У колико нисте, подесите MetaMask новчаник пре употребе платформе</p>
{/if}

<style>
    settings-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
    }

    span {
        font-size: 12px;
        text-align: center;
        color: #fff;
    }

    p {
        font-size: 11px;
        text-align: center;
        color: #185a9d;

        background-image: radial-gradient(ellipse at top, #185a9d, transparent);
        background-clip: text;

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent; 
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
    }

    .setup-button {
        display: flex;
        align-items: center;
        gap: 5px;
        min-width: 170px;
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

    .setup-button:hover {
        background-position: right center;
        padding: 5px;
    }

    .blue-button {
        height: 35px;
        color: #fff;
        padding: 5px 10px;
        margin: 10px;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.3s ease;
        border: 2px solid #185a9d;
        background: #185a9d;
    }

    .blue-button:hover {
        background: #fff;
        color: #185a9d
    }
</style>