<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    import { PlatformStore } from '$lib/UtilsStore';
    import Loader from '$lib/Loader.svelte';
    import Contract from '$lib/Utilities';
    import { QuestionInfoOutput, QuestionMeta } from '$lib/Models';
    import Popup from '$lib/Popup.svelte';

    // interaction loading flag...
    let isSavingData = false;
    let isLoadingQuestion = true;
    let isShowingPopup = false;
    let hasErrored = false;

    let questionInfo: QuestionInfoOutput = new QuestionInfoOutput(0, new QuestionMeta("", "", [], [], []) , 0, false);
    let voteOptions: number[] = [0,1,2,3,4];

    let meterValues: number[] = [];
    let extrasMeterValues: number[] = [];

    // percentage of total amount of users who voted on this questions
    $: totalVotePercentage = ((questionInfo.totalVoters / $PlatformStore.totalUsers) * 100).toFixed(1);

    onMount(async () => {
        const questionID = Number($page.params.slug);
        questionInfo = await Contract.getQuestionInfo(questionID);
        isLoadingQuestion = false;

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
        isSavingData = true;
        let popupMessage = "Дошло је до грешке, покушајте поново."

        // find which user option is selected
        const optionButtons = document.getElementsByName('voting-options');
        for(let i = 0; i < optionButtons.length; i++) {
            if(optionButtons[i].checked) {
                const optionValue = optionButtons[i].value;
                let response = false;

                try {
                    // check if we're voting or providing extra options
                    // voting: optionsValue > 0 | extras: optionsValue < 0
                    if (optionValue >= 0) {
                        response = await Contract.vote(questionInfo.id, i);
                    } else {
                        //extra option is transformed to suite platform contract extra options [0,1,2]
                        const transformedExtraOption = (optionValue * -1) - 1;
                        response = await Contract.provideExtra(questionInfo.id, transformedExtraOption);
                    }

                    // at this point, it is safe to assume both vote/reporting went well
                    popupMessage = `Ваш одговор је примљен.<br />Хвала !`;
                    hasErrored = false;
                } catch (err) {
                    console.log("Vote/report process failed. Reason: ", err);
                    hasErrored = true;  // indicate we've errored
                }

                // whatever happened, just show popup at this point
                // popup title has been set prior to this location
                isShowingPopup = true;
                break;  //no need to cycle further
            }
        }

        isSavingData = false;
    }

    async function refreshScores() {
        isShowingPopup = false;
        // automatically forward us to the results page
        const redirect = `/questions/${$page.params.slug}`;
        console.log("Forwarding to: ", redirect);
        await goto(redirect, {replaceState: true, invalidateAll: true});
    }
</script>

<!-- page popup definition -->
<Popup show={isShowingPopup}>
    <div slot="header">
        {#if hasErrored}
            Дошло је до грешке, покушајте поново...
        {:else}
            Ваш одговор је примљен.<br />Хвала !
        {/if}
    </div>
    <div slot="actions">
        {#if hasErrored}
            <button class="close-button" on:click={() => {isShowingPopup = false}}>
                Затвори 🙄
            </button>
        {:else}
            <button class="show-results" on:click={() => {refreshScores()}}>
                📈 Погледај резултате
            </button>
        {/if}
    </div>
</Popup>

<h1>{questionInfo.question.title}</h1>

<vote-panel>
    {#if !isLoadingQuestion}
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
                    <label for="none">Не адекватно питање [🚩] ({extrasMeterValues[2].toFixed(1)}%)</label>
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
                    <input type="radio" name="voting-options" value=-3/>Не адекватно питање [🚩]
                </hstack>
            {/if}
        </vstack>
    {:else}
        <Loader />
    {/if}
</vote-panel>

<!-- show button stack only if we're not laoding data -->
{#if !isLoadingQuestion}
    <centered>
        {#if isSavingData}
            <Loader message="Слање одговора у току..." />
        {:else}
            {#if questionInfo.hasVoted}
                <p>Укупно гласова: {questionInfo.totalVoters} (<i>{totalVotePercentage}%</i> корисникa платформе)</p>
            {/if}

            <action-buttons>
                <button class="back-button" on:click={() => { goto('/list') }}>Назад</button>
                {#if questionInfo.hasVoted}
                    <!-- <button disabled>Подели</button> -->
                {:else}
                    <button class="vote-button" on:click={performVote}>Пошаљи</button>
                {/if}
            </action-buttons>
        {/if}
    </centered>
{/if}

<style>
    vote-panel {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
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
        gap: 3.5px;
    }

    centered {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      word-wrap: break-word;
      text-align: center;
      margin-bottom: 15px;
    }

    action-buttons {
        display: flex;
        flex-direction: row;
        gap: 30px;
    }

    h1 {
        font-size: 35pt;
        text-align: center;
        word-wrap: break-word;
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
        border-radius: 5px;
        border: none;
        background: #137a22;
        box-shadow: 0 5px #163901;
    }

    .vote-button:hover {
        box-shadow: 0 3px #163901;
        top: 1px;
    }
    
    .vote-button:active {
        box-shadow: 0 0 #163901;
        top: 5px;
    }

    .back-button {
        margin-top: 15px;
        min-width: 130px;
        height: 40px;
        color: #fff;
        padding: 5px 10px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        border-radius: 5px;
        border: none;
        background: #3a86ff;
        box-shadow: 0 5px #4433ff;
    }

    .back-button:hover {
        box-shadow: 0 3px #4433ff;
        top: 1px;
    }
    
    .back-button:active {
        box-shadow: 0 0 #4433ff;
        top: 5px;
    }

    .show-results {
        min-width: 90px;
        height: 40px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        background-color: #408852;
        display: inline-block;
        color: #fff;
        padding: 10px;
    }

    .show-results:hover {
        background-image: linear-gradient(to top, #7a7a77, #2d044a);
        font-weight: bolder;
    }

    .close-button {
        padding: 10px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        position: relative;
        color: #fff;
        background-color: #123;
    }

    .close-button:hover {
        font-weight: bolder;
    }
</style>