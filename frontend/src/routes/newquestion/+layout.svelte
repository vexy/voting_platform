<script lang="ts">
    // import Modal from "$lib/ModalDialog.svelte";
    import Contract from "$lib/Utilities";
    import { goto } from "$app/navigation";

    let title: string = "";
    let labels: string[] = [];

    function saveQuestion() {
      // check inputs
      if (userInputsAreFine()) {
        Contract.addNewQuestion(title, labels).then( (result: boolean) => {
          if (result) {
            alert("Ново питање успешно сачувано !");
            title = "";
            labels = [];
          } else {
            alert("Дошло је до грешке приликом чувања. Покушајте поново.");
          }
        });
      } else {
        alert("Питање мора садржати наслов и барем 2 понуђена одговора.");
      }
    }

    function userInputsAreFine(): boolean {
      // labels[0,1] have to be present
      const lenghts = title.trim().length > 0;
      const labelNeeds = 
        labels[0] !== undefined && labels[1] !== undefined &&
        labels[0].trim().length > 0 && labels[1].trim().length > 0;

      return lenghts && labelNeeds;
      // return true;
    }
</script>

<container>
    <button on:click={() => goto("/list")} >Nazad</button>
    <h1>Поставите Ваше питање</h1>
    <title-inputs>
      <!-- <label for="title">Naslov pitanja</label> -->
      <input 
        bind:value={title}
        type="text"
        id="title"
        placeholder="Наслов питања..."
        class="title-input" />

        <div>Листа могућих одговора</div>
        <div>
          <input
            bind:value={labels[0]}
            id="label1"
            name="label1"
            type="text"
            minlength="8"
            maxlength="60"
            class="label-input"
            placeholder="Одговор 1"
            required
          >
        </div>
        <div>
          <input
            bind:value={labels[1]}
            id="label2"
            name="label2"
            type="text"
            minlength="8"
            maxlength="60"
            class="label-input"
            placeholder="Одговор 2"
            required
          >
        </div>
        <div>
          <input
            bind:value={labels[2]}
            id="label3"
            name="label3"
            type="text"
            minlength="8"
            maxlength="60"
            class="label-input"
            placeholder="Одговор 3"
            required
          >
        </div>
        <div>
          <input
            bind:value={labels[3]}
            id="label4"
            name="label4"
            type="text"
            minlength="8"
            maxlength="60"
            class="label-input"
            placeholder="Одговор 4"
            required
          >
        </div>
        <div>
          <input
            bind:value={labels[4]}
            id="label5"
            name="label5"
            type="text"
            minlength="8"
            maxlength="60"
            class="label-input"
            placeholder="Одговор 5"
            required
          >
        </div>
        <button on:click={saveQuestion} class="sky-button">Сачувај</button>

        <!-- <Modal>
          <div slot="trigger" let:open>
            <button on:click={saveQuestion} class="sky-button">Сачувај</button>
          </div>
        </Modal> -->
    </title-inputs>
</container>

<style>
    container {
        align-self: center;
    }

    title-inputs {
        display: flex;
        flex-direction:  column;
        gap: 12.5px;
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
      border: 0;
      border-bottom: 1px solid;
      box-shadow: 0 0 15px 4px rgba(0,0,0,0.06);
      background-color: inherit;
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