<script lang="ts">
    import Modal from '$lib/ModalDialog.svelte';
</script>

<Modal>
    <div slot="trigger" let:open>
      <button class="votebutton" on:click={open}>
        <vote-count>11</vote-count>
        Vote
      </button>
    </div>

    <div slot="header">
      <h1>Question title goes here</h1>
    </div>

    <div slot="content">
      <div><input type="radio" id="option1" name="name" /> Option 1</div>
      <div><input type="radio" id="option2" name="name" /> Option 2</div>
      <div><input type="radio" id="option3" name="name" /> Option 3</div>
      <div><input type="radio" id="option4" name="name" /> Option 4</div>
      <div><input type="radio" id="option5" name="name" /> Option 5</div>
    </div>
  
    <div slot="footer" let:store={{close}}>
      <button on:click={close}>Close</button>
    </div>
</Modal>

<style>
  vote-count {
    /* font: 15px Arial, sans-serif; */
    font-size: smaller;
    background: #faf1fa;
    color: #6a3f16;
    width: 15px;
    height: 15px;
    line-height: 15px;
    -moz-border-radius: 50%;
    border-radius: 50%;
    text-align: center;
    display:inline-block;

    /* width: 20px;
    height: 20px;
    line-height: 20px;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: solid 1px white;
    color: yellow;
    text-align: center;
    display: block; */
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