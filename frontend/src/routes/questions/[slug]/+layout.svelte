<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from "$app/stores";
    import { Utilities } from '$lib/Utilities';
    import { QuestionInfo } from '$lib/Models';

    const util = new Utilities();

    let questionInfo: QuestionInfo = new QuestionInfo(0,"","",[],[],[],0,false);
    let voteOptions: number[] = [0,1,2];

    onMount(async () => {
        const questionID = Number($page.params.slug);
        questionInfo = await util.getQuestionInfo(questionID);
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
                    await util.vote(questionInfo.id, i)
                        .then(() => {
                            alert("Sucessfully voted !");
                        })
                        .catch(() => {
                            console.log("Error...");
                            alert("There has been an error during vote !");
                        });
                } else {
                    // contains extras option
                    await util.provideExtra(questionInfo.id, optionValue);
                }

                break;  //no need to cycle further
            }
        }
    }
</script>

<container>
    <h1>{questionInfo.title}</h1>

    <vote-panel>
        <vstack>
            {#each voteOptions as option }
            <hstack>
                <input type="radio" name="voting-options" value={option}/>
                {questionInfo.labels[option]}
            </hstack>
            {/each}
        </vstack>
        <vstack>
            <hstack>
                <input type="radio" name="voting-options" value=-1/>Ништа од наведеног
            </hstack>
            <hstack>
                <input type="radio" name="voting-options" value=-2/>Питање није довољно јасно
            </hstack>
            <hstack>
                <input type="radio" name="voting-options" value=-3/>Ne adekvatno pitanje
            </hstack>
        </vstack>
    </vote-panel>

    <vstack style="width: 40%;">
        <button class="sky-button" on:click={performVote}>Vote</button>    
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