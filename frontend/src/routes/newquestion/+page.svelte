<script lang="ts">
    import Loader from "$lib/Loader.svelte";
    import Popup from "$lib/Popup.svelte";
    import Contract from "$lib/Utilities";
    import { goto } from "$app/navigation";

    // loading flag...
    let isLoading = false;
    let isShowingPopup = false;
    let hasErrored = false;
    let errorMessage = "";

    let title: string = "";
    let labels: string[] = [];

    async function saveQuestion() {
      // check inputs
      if (userInputsAreFine()) {
        try {
          isLoading = true;
          const success = await Contract.addNewQuestion(title, labels);

          if(success) {
            // indicate we're clear of errors
            hasErrored = false;
            title = "";
            labels = [];
          }
        } catch (err) {
          errorMessage = "Дошло је до грешке приликом чувања. Покушајте поново.";
          hasErrored = true;
        }        
      } else {
        errorMessage = "Питање мора садржати наслов и барем 2 понуђена одговора.";
        hasErrored = true;
      }

      // in any case, as a last step, stop the loader
      // and display a popup
      isShowingPopup = true
      isLoading = false;
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

<!-- page popup definition -->
<Popup show={isShowingPopup}>
  <div slot="header">
      {#if hasErrored}
        {errorMessage}
      {:else}
        Ново питање успешно сачувано !
      {/if}
  </div>
  <div slot="actions">
      <button class="close-button" on:click={() => {isShowingPopup = false}}>
          Затвори
      </button>
  </div>
</Popup>

<page-container>
  <h1>Поставите Ваше питање</h1>

  <new-question-frame>
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
  </new-question-frame>

  <action-buttons>
    {#if isLoading}
      <Loader message="Комуникација са blockchain мрежом..."/>
    {:else}
      <button class="back-button" on:click={() => goto('/list')}>Назад</button>
      <button class="save-button" on:click={saveQuestion}>Сачувај</button>
    {/if}
  </action-buttons>
</page-container>

<style>
  page-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
  }

  new-question-frame {
    display: flex;
    flex-direction: column;
    gap: 12.5px;
    /* align-self: stretch; */
  }

  action-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    /* padding: 5px; */
    margin: 10px;
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

  .save-button {
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
    background: #137a22;
    box-shadow: 0 5px #163901;
  }

  .save-button:hover {
    box-shadow: 0 3px #163901;
    top: 1px;
  }
  
  .save-button:active {
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