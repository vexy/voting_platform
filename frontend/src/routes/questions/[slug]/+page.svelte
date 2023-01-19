<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    import { PlatformStore } from '$lib/UtilsStore';
    import Loader from '$lib/Loader.svelte';
    import Contract from '$lib/Utilities';
    import { QuestionInfoOutput, QuestionMeta } from '$lib/Models';

    // loading flag...
    let isLoading = false;

    let questionInfo: QuestionInfoOutput = new QuestionInfoOutput(0, new QuestionMeta("", "", [], [], []) , 0, false);
    let voteOptions: number[] = [0,1,2,3,4];

    let meterValues: number[] = [];
    let extrasMeterValues: number[] = [];

    // percentage of total amount of users who voted on this questions
    $: totalVotePercentage = ((questionInfo.totalVoters / $PlatformStore.totalUsers) * 100).toFixed(1);

    onMount(async () => {
        const questionID = Number($page.params.slug);
        questionInfo = await Contract.getQuestionInfo(questionID);

        //pre-calc meter values if user provided answer
        if(questionInfo.hasVoted) {
            for(let score of questionInfo.question.scores) {
                meterValues.push((score / questionInfo.totalVoters) * 100);
            }
            //
            for(let ext of questionInfo.question.extras) {
                extrasMeterValues.push((ext / questionInfo.totalVoters) * 100);
            }
        }
    });

    async function performVote() {
        isLoading = true;

        // find which user option is selected
        const optionButtons = document.getElementsByName('voting-options');
        for(let i = 0; i < optionButtons.length; i++) {
            if(optionButtons[i].checked) {
                const optionValue = optionButtons[i].value;

                try {
                    // check if the button meta option is regular vote option
                    // or extras option (negative value)
                    if (optionValue >= 0) {
                        const success = await Contract.vote(questionInfo.id, i);
                        if(success) {
                            alert("Ваш одговор је примљен. Хвала !");

                            // automatically forward us to the results page
                            const redirect = "/questions/" + $page.params.slug;
                            await goto(redirect);
                        }
                    } else {
                        //extra option is transformed to suite platform contract extra options [0,1,2]
                        const transformedExtraOption = (optionValue * -1) - 1;
                        await Contract.provideExtra(questionInfo.id, transformedExtraOption);
                    }
                } catch (err) {
                    console.log("Vote/report process failed. Reason: ", err);
                    alert("Дошло је до грешке, покушајте поново.");
                }

                break;  //no need to cycle further
            }
        }

        isLoading = false;
    }
</script>

<h1>{questionInfo.question.title}</h1>

<vote-panel>
    <vstack>
        {#if questionInfo.hasVoted}
            <vstack>
                {#each questionInfo.question.labels as caption, index}
                    <label for={caption}>{caption} ({meterValues[index].toFixed(1)} %)</label>
                    <meter id={caption} min="0" max="100" low="30" high="75" optimum="80" value={meterValues[index]} />
                {/each}
            </vstack>
        {:else}
            {#each voteOptions as option }
                {#if questionInfo.question.labels[option] !== undefined }
                    <hstack>
                        <input type="radio" name="voting-options" value={option}/>
                        {questionInfo.question.labels[option]}
                    </hstack>
                {/if}
            {/each}
        {/if}
    </vstack>
    <vstack>
        {#if questionInfo.hasVoted}
            <vstack>
                <label for="none">Ништа од наведеног ({extrasMeterValues[0].toFixed(1)}%)</label>
                <meter id="none" min="0" max="100" low="30" high="75" optimum="80" value={extrasMeterValues[0]} />
            </vstack>
            <vstack>
                <label for="none">Питање није довољно јасно ({extrasMeterValues[1].toFixed(1)}%)</label>
                <meter id="none" min="0" max="100" low="30" high="75" optimum="80" value={extrasMeterValues[1]} />
            </vstack>
            <vstack>
                <label for="none">Не адекватно питање ({extrasMeterValues[2].toFixed(1)}%)</label>
                <meter id="none" min="0" max="100" low="30" high="75" optimum="80" value={extrasMeterValues[2]} />
            </vstack>
        {:else}
            <hstack>
                <input type="radio" name="voting-options" value=-1/>Ништа од наведеног
            </hstack>
            <hstack>
                <input type="radio" name="voting-options" value=-2/>Питање није довољно јасно
            </hstack>
            <hstack>
                <input type="radio" name="voting-options" value=-3/>Не адекватно питање
            </hstack>
        {/if}
    </vstack>
</vote-panel>

<centered>
    {#if isLoading}
        <Loader message="Слање одговора у току..." />
    {:else}
        {#if questionInfo.hasVoted}
            <p>Укупно гласова: {questionInfo.totalVoters} (<i>{totalVotePercentage}%</i> корисникa платформе)</p>
        {:else}
            <button class="vote-button" on:click={performVote}>Пошаљи</button>
        {/if}

        <button class="vote-button" on:click={() => { goto('/list') }}>Назад</button>
    {/if}
</centered>

<style>
    vote-panel {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    vstack {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    centered {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      padding: 5px;
      word-wrap: break-word;
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
        /* background-color: aqua; */
    }

    .vote-button {
        margin-top: 15px;
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
        border-radius: 5px;
        border: none;
        background: #3a86ff;
        box-shadow: 0 5px #4433ff;
    }

    .vote-button:hover {
        box-shadow: 0 3px #4433ff;
        top: 1px;
    }
    
    .vote-button:active {
        box-shadow: 0 0 #4433ff;
        top: 5px;
    }
</style>