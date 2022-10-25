<script lang="ts">
    import NewQuestionModal from "./Questions/NewQuestionModal.svelte";
    import QuestionPanel from "./Questions/QuestionPanel.svelte";

    let allQuestions = [
        { id: 345, name: "Name", votes: 9 },
        { id: 771, name: "Howdy ??", votes: 0 },
        { id: 231, name: "Pick blueberry or pinapple ?", votes: 11 },
        { id: 259, name: "Name 3", votes: 45 },
        { id: 353, name: 'Nekada davno bejase ovako...', votes: 56 },
        { id: 810, name: "Изаберите опцију реновирања parkova", votes: 11 },
        { id: 94, name: "Da li bi ste ?", votes: 1 },
        { id: 200, name: "Да ли сте за реновирање Градске Скупштине", votes: 3 },
        { id: 4, name: "Name 4", votes: 0 },
        { id: 23, name: "Pitanje 13", votes: 13 },
        { id: 35, name: "Name 8", votes: 3 },
        { id: 734, name: "Name 8", votes: 1 },
        { id: 51, name: "Name 8", votes: 0 },
    ];
</script>

<center-container>
    <header-container>
        <h2>Укупан број питања: <code>15</code></h2>
        <NewQuestionModal />
    </header-container>
        
    <questions_container>
        {#each allQuestions as question }
            <questionbody>
                <code><u>#{question.id}</u></code>
                <question-title>{question.name}</question-title>

                <QuestionPanel />
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
        justify-content: baseline;
        background-color: #bbdefb;
        /* border: 0.5px solid #ffcc80; */
        height: 60vh;
        gap: 5px;
        border-radius: 5px;
        overflow-y: scroll;
        padding: 10px;
    }

    questionbody {
        display: flex;
        flex-direction: row;
        /* background-color: #4a5b7c; */
    }

    question-title {
        flex-grow: 1;
        margin: 5px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 18px;
        color: white;
        align-items: flex-start;
        align-self: baseline;
        /* background-color: aqua; */
    }
    question-title:hover {
        font-style: italic;
        font-size: 20px;
        /* color: gray; */
        color: #3a86ff
    }
</style>