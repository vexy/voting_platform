<script lang="ts">
    import { Utilities } from "$lib/Utilities";

    let title: string = "";
    let labels: string[] = [];

    function saveQuestion() {
      const u = new Utilities();
      u.addNewQuestion(title, labels).then( (result: boolean) => {
        if (result) {
          alert("Question successfully added !");
        } else {
          alert("There has been an error saving this question.");
        }
      });
    }
</script>

<container>
    <!-- <div>What if we wanted to do this as a background div itself ?</div> -->
    <h1>Postavite vaše pitanje</h1>
    <title-inputs>
      <label for="title">Naslov pitanja</label>
      <input 
        bind:value={title}
        type="text"
        id="title"
        placeholder="Naslov pitanja ?"
        class="title-input" />

        <div>
          <label for="label1">Odgovor 1</label>
          <input
            bind:value={labels[0]}
            id="label1"
            name="label1"
            type="text"
            minlength="8"
            maxlength="60"
            class="label-input"
            required
          >
        </div>
        <div>
          <label for="label2">Odgovor 2</label>
          <input
            bind:value={labels[1]}
            id="label2"
            name="label2"
            type="text"
            minlength="8"
            maxlength="60"
            class="label-input"
            required
          >
        </div>
        <div>
          <label for="label3">Odgovor 3</label>
          <input
            bind:value={labels[2]}
            id="label3"
            name="label3"
            type="text"
            minlength="8"
            maxlength="60"
            class="label-input"
            required
          >
        </div>
        <div>
          <label for="label4">Odgovor 4</label>
          <input
            bind:value={labels[3]}
            id="label4"
            name="label4"
            type="text"
            minlength="8"
            maxlength="60"
            class="label-input"
            required
          >
        </div>
        <div>
          <label for="label5">Odgovor 5</label>
          <input
            bind:value={labels[4]}
            id="label5"
            name="label5"
            type="text"
            minlength="8"
            maxlength="60"
            class="label-input"
            required
          >
        </div>
        <button on:click={saveQuestion} class="sky-button">Sačuvaj</button>
    </title-inputs>
</container>

<style>
    container {
        align-self: center;
    }

    title-inputs {
        display: flex;
        flex-direction:  column;
        gap: 5px;
        justify-content: space-around;
    }

    .title-input {
      box-sizing: border-box;
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      margin-bottom: 25px;
      border: 1px solid #eee;
      font-size: medium;
    }

    .label-input {
      box-sizing: border-box;
      width: 100%;
      padding: 5px;
      /* margin: 5px; */
      /* border-color: yellow; */
      border: 0;
      border-bottom: 1px solid;
      box-shadow: 0 0 15px 4px rgba(0,0,0,0.06);
      background-color: inherit;
    }

    .sky-button {
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