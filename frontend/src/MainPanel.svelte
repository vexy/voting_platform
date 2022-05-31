<div class="container">
    <div class="flex-child">
        <button class="button--green" on:click={getVotingToken}>Request token</button>
        <p>*Request will be sent to following address:<br>
            <code>{platformAddress}</code>
        </p>
    </div>
    <div class="flex-child">
        <button class="button-sky" on:click={listPolls}>Browse polls</button>
        <button class="button-sky" on:click={postNewPoll}>Create new poll</button>
        <p><i>* Creating new polls will cost <code>XYZ</code> currency</i></p>
    </div>
</div>


<script>
    let platformAddress = "0x672ba2c3b44e81f811de7ae21"

    function getPlatformAddress() {
        //query the contract for the address info
        //TODO: platformAddress = service.getClientAddress;
    }

    function getVotingToken() {
        alert("Comming soon !");
    }

    function listPolls() {
        alert("Comming soon !");
    }

    function postNewPoll() {
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


    .button-sky {
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
    .button-sky:hover {
        box-shadow: 0 3px #4433ff;
        top: 1px;
    }
    .button-sky:active {
        box-shadow: 0 0 #4433ff;
        top: 5px;
    }

    .container {
        display: flex;
    }

    .flex-child {
        flex: 1;
        border: 1.5px solid gray;
        padding: 1em;
    }  

    .flex-child:first-child {
        margin-right: 20px;
    }

</style>