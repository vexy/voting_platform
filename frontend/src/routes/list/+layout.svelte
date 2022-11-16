<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { Utilities } from "$lib/Utilities";
    import type { QuestionInfo } from "$lib/Models";
    
    let totalQuestions: number = 0;
    let allQuestions: QuestionInfo[] = [];
    let tableQuestions: QuestionInfo[] = [];
    //
    let searchTerm: string = "";
    let questionsInSearch: QuestionInfo[] = [];

    // get all questions and total count
    onMount(async () => {
        const util = new Utilities();
        totalQuestions = await util.questionsCount();
        allQuestions = await util.getAllQuestions();
        tableQuestions = allQuestions;
    });

    function openVotePage(questionID: number) {
        goto(`/questions/${questionID}`);
    }

    function performSearch() {
        if (searchTerm.length > 0) {
            // filter out all the questions starting with searchTerm
            questionsInSearch = allQuestions.filter((qInfo) => { return qInfo.title.includes(searchTerm) });
            tableQuestions = questionsInSearch;
        } else {
            // clear questions in search and put back all questions
            questionsInSearch = [];
            tableQuestions = allQuestions;
        }
    }
</script>

<center-container>
    <searchbar>
        <input type="search" bind:value={searchTerm} placeholder="Pretraga pitanja..."/>
        <button class="search-button" on:click={performSearch}>Pronađi</button>
    </searchbar>

    <header-container>
        <h2>Укупан број питања: <code>{totalQuestions}</code></h2>
        <!-- <NewQuestionModal /> -->
        <button class="addquestion" on:click={() => goto("/newquestion")} >+ Додај ново питање</button>
    </header-container>
        
    <questions_container>
        {#each tableQuestions as question }
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
</center-container>

<style>
    center-container {
        align-self: center;
        width: 85vw;
    }

    searchbar {
        display: flex;
        justify-content: center;
        gap: 15px;
    }

    input {
        width: 75%;
        padding: 10px;
        font-size: 15px;
        letter-spacing: 2px;
        border-width: 0.5px;
        border-radius: 25px;
        border-color: white;
        outline: none;
        transition: all .3s ease-in-out;
        background-color: transparent;
        color:#fff;
    }

    input-search:placeholder{
        color:rgba(255,255,255,.5);
        font-size: 16px;
        letter-spacing: 2px;
        font-weight: 100;
    }

    .search-button {
        border-style: none;
        border-radius: 15%;
        background-color: #80ed99;
        cursor: pointer;
        color: whitesmoke;
        margin-left: 10px;
    }

    .search-button:hover {
        border: 0.5px solid #ffcc80;
        background-color: #57cc99;
        font-weight: bolder;
        margin-left: 5px;
    }

    .search-button:active {
        font-weight: lighter;
        background-color: #57bcaa;
    }

    header-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
    }

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

    .addquestion {
        min-width: 120px;
        height: 35px;
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
        background: #80ed99;
        box-shadow: 0 5px #57cc99;
    }
    .addquestion:hover {
        box-shadow: 0 3px #57cc99;
        top: 1px;
    }
    .addquestion:active {
        box-shadow: 0 0 #57cc99;
        top: 5px;
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