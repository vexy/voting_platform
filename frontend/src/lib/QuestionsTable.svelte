<script lang="ts">
    import { goto } from "$app/navigation";
    import type { QuestionInfo } from "./Models";

    export let dataSet: QuestionInfo[];

    function openVotePage(questionID: number) {
        goto(`/questions/${questionID}`);
    }
</script>

<questions_container>
    {#each dataSet as question }
        <questionbody>
            <code><u>#{question.id}</u></code>
            <question-title>{question.title}</question-title>
            <button class="votebutton" on:click={() => openVotePage(question.id)}>
                {#if question.hasVoted }
                    Detalji ({question.totalVoters})
                {:else}
                    Pogledaj ({question.totalVoters})
                {/if}
            </button>
            <!-- <QuestionPanel /> -->
        </questionbody>
    {/each}
</questions_container>

<style>
    questions_container {
        display: flex;
        flex-direction: column;

        height: 60vh;
        gap: 5px;
        padding: 10px;

        /* border: 0.5px solid #ffcc80; */
        border-radius: 5px;
        overflow-y: scroll;
        background-color: #bbdefb;
    }

    questionbody {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        /* justify-content: baseline; */
        /* background-color: #4a5b7c; */
    }

    question-title {
        flex-grow: 1;
        margin: 5px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 18px;
        color: white;
    }
    question-title:hover {
        font-style: italic;
        font-size: 20px;
        /* color: gray; */
        color: #3a86ff
    }

    .votebutton {
        min-width: 130px;
        height: 40px;
        color: #fff;
        padding: 5px 10px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        display: inline-block;
        outline: none;
        overflow: hidden;
        border-radius: 5px;
        border: none;
        background-color: #3a86ff
    }
    .votebutton:hover {
        border-radius: 5px;
        padding-right: 24px;
        padding-left:8px;
    }
    .votebutton:hover:after {
        opacity: 1;
        right: 10px;
    }
    .votebutton:after {
        content: "\00BB";
        position: absolute;
        opacity: 0;
        font-size: 20px;
        line-height: 40px;
        top: 0;
        right: -20px;
        transition: 0.4s;
    } 
</style>