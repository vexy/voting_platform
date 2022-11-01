<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from "$app/stores";

    let questionTitle: string;
    let questionLabels: string[] = ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"];

    onMount(async () => {
        //perform loadup procedure here
    });
</script>

<container>
    <!-- <h1>{$page.params.slug}</h1> -->
    <h1>Da li ste za ukidanje profesionalne politike ?</h1>

    <vote-panel>
        <vstack>
            {#each questionLabels as caption }
            <hstack>
                <input type="radio" id="vote-option" />
                {caption}
            </hstack>
            {/each}
        </vstack>
        <vstack>
            <hstack>
                <input type="radio" />Ништа од наведеног
            </hstack>
            <hstack>
                <input type="radio" />Питање није довољно јасно
            </hstack>
            <hstack>
                <input type="radio" />"Ју, господе боже !"
            </hstack>
        </vstack>
    </vote-panel>
</container>

<style>
    container {
        /* to occupy entire width */
        flex-grow: 1;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    vote-panel {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        background-color: blueviolet;

        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    vstack {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    hstack {
        display: flex;
        flex-direction: row;
        align-items: baseline;
    }

    h1 {
        font-size: 35pt;
        text-align: center;
        word-wrap: break-word;
        background-color: aqua;
    }
</style>