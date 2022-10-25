<script lang="ts">
    import Modal from '$lib/ModalDialog.svelte';
</script>

<Modal>
    <div slot="trigger" let:open>
        <button class="addquestion" on:click={open} >+ Додај ново питање</button>
    </div>

    <div slot="header">
      <h2>Поставите Ваше питање</h2>
    </div>

    <div slot="content">
        <div>
          <label for="q_entry">Naslov pitanja</label>
          <input
            id="title"
            name="q_entry"
            type="text"
            minlength="8"
            maxlength="60"
            required
          >
        </div>
        <div>
          <label for="label1">Odgovor 1</label>
          <input
            id="label1"
            name="label1"
            type="text"
            minlength="8"
            maxlength="60"
            required
          >
        </div>
        <div>
          <label for="label2">Odgovor 2</label>
          <input
            id="label2"
            name="label2"
            type="text"
            minlength="8"
            maxlength="60"
            required
          >
        </div>
        <div>
          <label for="label3">Odgovor 3</label>
          <input
            id="label3"
            name="label3"
            type="text"
            minlength="8"
            maxlength="60"
            required
          >
        </div>
        <div>
          <label for="label4">Odgovor 4</label>
          <input
            id="label4"
            name="label4"
            type="text"
            minlength="8"
            maxlength="60"
            required
          >
        </div>
        <div>
          <label for="label5">Odgovor 5</label>
          <input
            id="label5"
            name="label5"
            type="text"
            minlength="8"
            maxlength="60"
            required
          >
        </div>
    </div>
  
    <div slot="footer" let:store={{close}}>
      <button on:click={close}>Close</button>
      <button>Save</button>
    </div>
</Modal>

<style>
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