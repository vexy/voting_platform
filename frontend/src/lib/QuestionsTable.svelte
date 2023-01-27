<script lang="ts">
    import { goto } from "$app/navigation";
    import Loader from '$lib/Loader.svelte';
    import Utilities from "$lib/Utilities";
    import type { QuestionInfoOutput } from "$lib/Models";

    export let dataSet: QuestionInfoOutput[];
    export let isLoading: boolean = false;

    async function performReport(questionID: number) {
        await Utilities.provideExtra(questionID, 2);
        alert("Ваш избор је сачуван. Хвала !")
        goto(`/list`);
    }
</script>

<questions_container>
    {#if !isLoading}
        {#each dataSet as question }
            <questionbody>
                <code><u>#{question.id}</u></code>
                <question-title>{question.question.title}</question-title>
                    {#if question.hasVoted }
                        <button class="resultsbutton" on:click={() => goto(`/questions/${question.id}`)}>
                            📈 Резултати
                        </button>
                    {:else}
                        <questionbody>
                            <button class="votebutton" on:click={() => goto(`/questions/${question.id}`)}>
                                Детаљи ({question.totalVoters})
                            </button>
                            <button class="reportbutton" on:click={performReport(question.id)}>
                                🚩
                            </button>
                        </questionbody>
                    {/if}
            </questionbody>
        {/each}
    {:else}
        <ll>
            <Loader message="Учитавање..."/>
        </ll>
    {/if}
</questions_container>

<style>
    questions_container {
        display: flex;
        flex-direction: column;
        height: 60vh;
        gap: 5px;
        padding: 10px;
        border-radius: 5px;
        overflow-y: scroll;
        background-color: #bbdefb;
    }
    questionbody {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    ll {
        flex: 1;
        display: flex;
        justify-content: space-around;
    }

    question-title {
        flex-grow: 1;
        margin: 5px;
        font-size: 18px;
        color: white;
    }
    question-title:hover {
        font-size: 20px;
        font-style: italic;
        color: #3a86ff
    }

    .votebutton {
        min-width: 95px;
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

    .reportbutton {
        min-width: 40px;
        height: 40px;
        border-radius: 5px;
        border: none;
        background-color: #d9757f;
        margin-left: 5px;
    }
    .reportbutton:hover {
        padding: 10px;
        border: #fff1ab;
        border-width: 1px;
        border-style: dotted;
    }

    .resultsbutton {
        min-width: 90px;
        height: 40px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        background-color: #408852;
        display: inline-block;
        color: #fff;
    }
    .resultsbutton:hover {
        font-weight: bolder;
    }
</style>