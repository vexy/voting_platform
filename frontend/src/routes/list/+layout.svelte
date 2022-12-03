<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import Utilities from "$lib/Utilities";
    import QuestionsTable from "$lib/QuestionsTable.svelte";
    import type { QuestionInfo } from "$lib/Models";
    import Header from "$lib/Header.svelte";
    
    let totalQuestions: number = 0;
    let allQuestions: QuestionInfo[] = [];
    let tableQuestions: QuestionInfo[] = [];
    //
    let searchTerm: string = "";
    let questionsInSearch: QuestionInfo[] = [];

    // get all questions and total count
    onMount(async () => {
        totalQuestions = await Utilities.questionsCount();
        allQuestions = await Utilities.getAllQuestions();
        tableQuestions = allQuestions;
    });

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

<Header />
<center-container>
    <searchbar>
        <input type="search" bind:value={searchTerm} placeholder="Претрага питања..."/>
        <button class="search-button" on:click={performSearch}>Пронађи</button>
    </searchbar>

    <header-container>
        <h2>Укупан број питања: <code>{totalQuestions}</code></h2>
        <button class="addquestion" on:click={() => goto("/newquestion")} >+ Додај ново питање</button>
    </header-container>

    <QuestionsTable dataSet={tableQuestions} />
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

    input:placeholder{
        color:rgba(255,255,255,.5);
        font-size: 16px;
        letter-spacing: 5px;
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
</style>