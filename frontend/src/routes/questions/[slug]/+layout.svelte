<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from "$app/stores";
    import Contract from '$lib/Utilities';
    import { QuestionInfo } from '$lib/Models';

    let questionInfo: QuestionInfo = new QuestionInfo(0,"","",[],[],[],0,false);
    let voteOptions: number[] = [0,1,2,3,4];

    let meterValues: number[] = [];
    let extrasMeterValues: number[] = [];

    onMount(async () => {
        const questionID = Number($page.params.slug);
        questionInfo = await Contract.getQuestionInfo(questionID);

        //pre-calc meter values if user provided answer
        if(questionInfo.hasVoted) {
            for(let score of questionInfo.scores) {
                meterValues.push((score / questionInfo.totalVoters) * 100);
            }
            //
            for(let ext of questionInfo.extras) {
                extrasMeterValues.push((ext / questionInfo.totalVoters) * 100);
            }
        }
    });

    async function performVote() {
        // check which user option is selected
        const optionButtons = document.getElementsByName('voting-options');
        for(let i = 0; i < optionButtons.length; i++) {
            if(optionButtons[i].checked) {
                const optionValue = optionButtons[i].value;

                // check the meta of option button selected
                if (optionValue >= 0) {
                    // contains voting option
                    console.log("Voting...");
                    await Contract.vote(questionInfo.id, i)
                        .then(() => {
                            alert("Ваш одговор је примљен. Хвала !");
                        })
                        .catch(() => {
                            console.log("Error...");
                            alert("Дошло је до грешке, покушајте поново.");
                        });
                } else { // contains extras option
                    const transformedExtraOption = (optionValue * -1) - 1;
                    //extra option is transformed to suite platform contract extra options [0,1,2]
                    await Contract.provideExtra(questionInfo.id, transformedExtraOption);
                }

                break;  //no need to cycle further
            }
        }
    }
</script>

<container>
    <h1>{questionInfo.title}</h1>
    <!-- <h3><code>- rezultati - </code></h3> -->

    <vote-panel>
        <vstack>
            {#if questionInfo.hasVoted}
                <vstack>
                    {#each questionInfo.labels as caption, index}
                        <label for={caption}>{caption} ({meterValues[index]} %)</label>
                        <meter id={caption} min="0" max="100" low="30" high="75" optimum="80" value={meterValues[index]} />
                    {/each}
                </vstack>
            {:else}
                {#each voteOptions as option }
                    {#if questionInfo.labels[option] !== undefined }
                        <hstack>
                            <input type="radio" name="voting-options" value={option}/>
                            {questionInfo.labels[option]}
                        </hstack>
                    {/if}
                {/each}
            {/if}
        </vstack>
        <vstack>
            {#if questionInfo.hasVoted}
                <vstack>
                    <label for="none">Ништа од наведеног ({extrasMeterValues[0]}%)</label>
                    <meter id="none" min="0" max="100" low="30" high="75" optimum="80" value={extrasMeterValues[0]} />
                </vstack>
                <vstack>
                    <label for="none">Питање није довољно јасно ({extrasMeterValues[1]}%)</label>
                    <meter id="none" min="0" max="100" low="30" high="75" optimum="80" value={extrasMeterValues[1]} />
                </vstack>
                <vstack>
                    <label for="none">Не адекватно питање ({extrasMeterValues[2]}%)</label>
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
    <vstack>
        <vstack-centered>
            {#if questionInfo.hasVoted}
                <code>Укупно гласова: {questionInfo.totalVoters}</code>
            {:else}
                <button class="sky-button" on:click={performVote}>Пошаљи</button>
            {/if}
        </vstack-centered>
    </vstack>
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
        /* background-color: blueviolet; */

        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    vstack {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    vstack-centered {
        align-self: center;
        margin-top: 10px;
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

    .sky-button {
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

    .sky-button:hover {
      box-shadow: 0 3px #4433ff;
      top: 1px;
    }
    
    .sky-button:active {
      box-shadow: 0 0 #4433ff;
      top: 5px;
    }
</style>