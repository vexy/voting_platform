<script lang="ts">
    import { ProviderCommons } from "$lib/Provider";

    // define static assets
    const metamask_logo = new URL('./assets/metamask.svg', import.meta.url).href
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

<button class="blue-button" on:click={() => isExpanded = !isExpanded }>⚙️ Подешавања</button>
{#if isExpanded}
    <hstack>
        <row>
            <button class="mumbai-button" on:click={configureMumbai}>
                <!-- <img src={polygon_logo} height="25" width="25" alt="polygon_logo" /> -->
                Додај Mumbai мрежу
            </button>
    
            <p>Додајте параметре <i>Mumbai мреже</i> у Ваш MetaMask</p>
        </row>

        <row>
            <button class="mumbai-button" on:click={() => ProviderCommons.getTestMATIC()}>
                Набави MATIC токене
            </button>

            <p>За употребу платформе, потребно је набавити <code>MATIC</code> токене</p>
        </row>
    </hstack>
{/if}

<style>
    hstack {
        display: flex;
        flex-direction: column;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    p {
        font-size: 12px;
    }

    row {
        display: flex;
        flex-direction: row;
        align-items: baseline;
    }

    .mumbai-button {
        min-width: 110px;
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

    .blue-button {
        /* min-width: 90px; */
        height: 35px;
        color: #fff;
        padding: 5px 10px;
        margin: 10px;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.3s ease;
        border: 2px solid #2c0b8e;
        background: #2c0b8e;
    }

    .blue-button:hover {
        background: #fff;
        color: #2c0b8e
    }
</style>