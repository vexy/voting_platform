<script lang="ts">
    async function checkTutorials() {
        window.open('https://youtu.be/pff3fzqF6v0', '_blank', 'noreferrer');
    }

    async function downloadMetamask() {
        window.open('https://metamask.io/download', '_blank', 'noreferrer');
    }
</script>

<container>
    <h3><i>MetaMask новчаник није детектован...</i></h3>
    <button class="instructions" on:click={downloadMetamask}>
        Набави MetaMask новчаник
    </button>
    <button class="instructions" on:click={checkTutorials}>
        Упутства за приступање
    </button>
    <p>За више детаља, погледајте видео упутства за приступање платформи...</p>
</container>

<style>
    container {
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        overflow-y: scroll;
        padding: 20px;
        background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
    }

    h3, p, button {
        align-self: center;
    }

    p {
        font-size: 14px;
        color: #1e21dc;
    }

    .instructions {
        min-width: 130px;
        max-width: 250px;
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

    .instructions:hover {
        background-position: right center;
        padding: 5px 10px;
    }

</style>