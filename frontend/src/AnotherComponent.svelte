<h2>Welcome to the simple voting platform</h2>
<button class="button--green" on:click={getVotingToken}>Get voting token</button>

<script>
    function getVotingToken() {
        alert("Comming soon !");
    }
</script>

<style>
    h2 {
        color: #d1348f;
    }

    .button--green {
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
        border-radius: 20px;
        border: 2px solid #57cc99;
        background: #57cc99;
    }
    .button--green:hover {
        background: #fff;
        color: #57cc99
    }
</style>