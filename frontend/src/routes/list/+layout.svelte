<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { Utilities } from "$lib/Utilities";
    import { Question } from "$lib/Question";

    const util = new Utilities();
    
    let totalQuestions: number = 0;
    let allQuestions: Question[] = [];

    onMount(async () => {
        // get all questions and total count
        allQuestions = await util.getAllQuestions();
        totalQuestions = await util.questionsCount();
    });

    function addNewQuestion() {
        goto("/newquestion");
    }

    function openVotePage(questionID: number) {
        goto(`/questions/${questionID}`);
    }
</script>

<center-container>
    <header-container>
        <h2>Укупан број питања: <code>{totalQuestions}</code></h2>
        <!-- <NewQuestionModal /> -->
        <!-- <a href="/newquestion">New  Q</a> -->
        <button class="addquestion" on:click={addNewQuestion} >+ Додај ново питање</button>
    </header-container>
        
    <questions_container>
        {#each allQuestions as question }
            <questionbody>
                <code><u>#{question.id}</u></code>
                <question-title>{question.title}</question-title>
                <button class="votebutton" on:click={() => openVotePage(question.id)}>Vote</button>
                <!-- <QuestionPanel /> -->
            </questionbody> 
        {/each}
    </questions_container>
</center-container>

<style>
    center-container {
        position: absolute;
        margin: auto;
        top: 50%;
        width: 90%;
        left: 0;
        right: 0;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        padding: 20px;
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