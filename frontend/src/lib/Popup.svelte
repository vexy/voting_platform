<script lang="ts">
    import { fade } from "svelte/transition";

    export let show: boolean;
</script>

{#if show}
    <overlay transition:fade>
        <popup>
            <h2>
                <slot name="header" />
            </h2>

            <div>
                <slot name="body" />
            </div>

            <button-area>
                <slot name="actions" />
            </button-area>
        </popup>
    </overlay>
{/if}

<style>
    overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100vh;
        width: 100vw;
        background-image: linear-gradient(to top, rgba(190, 100, 25, 0.75), rgba(10,150,125, 0.8));
        z-index: 1;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    popup {
        align-self: center;

        margin: 10%;
        box-shadow: 0px 0px 10px #fff;
        border-radius: 10px;
        background-color: #fff;
    }

    h2, div {
        text-align: center;
        word-wrap: break-word;
        padding: 10px;
        user-select: none;
    }

    h2 {
        background-image: linear-gradient(to top, #868484 0%, #123456 100%);
        background-clip: text;
        margin: 10px;

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent; 
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
    }

    h2:hover {
        color: #123456;
        background-image: initial;
        background-clip: initial;

        -webkit-background-clip: initial;
        -webkit-text-fill-color: initial; 
        -moz-background-clip: initial;
        -moz-text-fill-color: initial;
    }

    div { 
        color: blueviolet;
    }

    button-area {
        margin: 10px;
        padding: 10px;
        display: flex;
        justify-content: space-around;
    }
</style>