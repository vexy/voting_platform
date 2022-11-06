<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from "$app/stores";
    import { Utilities } from '$lib/Utilities';
    import { QuestionInfo } from '$lib/Models';

    let questionTitle: string;
    let questionLabels: string[] = ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"];
    let questionInfo: QuestionInfo = new QuestionInfo("", [], [], []);

    onMount(async () => {
        const util = new Utilities();

        const questionID = Number($page.params.slug);
        questionInfo = await util.getQuestionInfo(questionID);
    });
</script>

<container>
    <h1>{questionInfo.title}</h1>

    <vote-panel>
        <vstack>
            {#each questionInfo.labels as caption }
            <hstack>
                <input type="radio" id="vote-option" name="voting-options"/>
                {caption}
            </hstack>
            {/each}
        </vstack>
        <vstack>
            <hstack>
                <input type="radio" name="extras"/>Ништа од наведеног
            </hstack>
            <hstack>
                <input type="radio" name="extras"/>Питање није довољно јасно
            </hstack>
            <hstack>
                <input type="radio" name="extras"/>"Ју, господе боже !"
            </hstack>
        </vstack>
    </vote-panel>
    <button>Vote</button>
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