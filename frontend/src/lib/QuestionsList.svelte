<script lang="ts">
    let allQuestions = [
        { name: "Name", votes: 1 },
        { name: "Howdy ??", votes: 2 },
        { name: "Pick blueberry or pinapple ?", votes: 3 },
        { name: "Name 3", votes: 4 },
        { name: 'Nekada davno bejase ovako...', votes: 3 },
        { name: "Изаберите опцију реновирања parkova", votes: 3 },
        { name: "Da li bi ste ?", votes: 3 },
        { name: "Да ли сте за реновирање Скупштине", votes: 3 },
        { name: "Name 4", votes: 3 },
        { name: "Pitanje 13", votes: 3 },
        { name: "Name 8", votes: 3 },
        { name: "Name 8", votes: 3 },
        { name: "Name 8", votes: 3 },
    ];
</script>

<center-container>
    <questionbody>
        <h2 class="question-title">Укупан број питања: <code>15</code></h2>
        <button class="votebutton">+ Dodaj novo pitanje</button>
    </questionbody>
    <questions_container>
        {#each allQuestions as question }
            <questionbody>
                <question-title>{question.name}</question-title>
                <!-- <p>SPACE IN BETWEEN</p> -->
                <button class="votebutton">
                    <vote-count>{question.votes}</vote-count>
                    Vote
                </button>
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

    questions_container {
        display: flex;
        flex-flow: column; 
        flex-direction: column;  
        background-color: #bbdefb;
        border: 0.5px solid #ffcc80;
        height: 60vh;
        gap: 5px;
        border-radius: 5px;
        overflow-y: scroll;
    }

    questionbody {
        display: flex;
        flex-direction: row;
        flex-flow: row;
        background-color: #4a5b7c;
    }

    vote-count {
        /* font: 15px Arial, sans-serif; */
        background: #faf1fa;
        color: #6a3f16;
        text-align: center;
        border-radius: 50%;
        box-sizing: content-box;
    }

    question-title {
        flex-grow: 1;
        margin: 5px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 18px;
        color: white;
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