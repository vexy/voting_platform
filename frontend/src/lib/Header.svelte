<script lang="ts">
    import { Utilities } from "$lib/Utilities";
    
    const utils = new Utilities();
</script>

<nav>
    {#await utils.isRegisteredUser()}
        <i>Loading...</i>
    {:then success} 
        {#if success}
            {#await utils.getUserBalance() then totalPoints}
                <div>Broj poena: <code>{Number(totalPoints).toLocaleString()}</code></div>
            {/await}
            {#await utils.signer?.getAddress() then addr}
                <div>Novčanik: {addr}</div>
            {/await}
        {/if}
    {/await}
</nav>

<style>
    nav {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        padding: 5px;
        background-image: linear-gradient(to right, #c09a81 0%, #dfa579 100%);
        /* background: deepskyblue; */
    }

    div {
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size: small;
        margin: 10px;
    }

    code {
        color: yellow;
    }

    code:hover {
        color: whitesmoke;
        font-weight: bolder;
    }

    @media all and (max-width: 800px) {
        nav {
            /* When on medium sized screens, we center it by evenly distributing empty space around items */
            justify-content: space-around;
            background-image: linear-gradient(to left, #c0eeb5 25%, #015a3c 100%);
        }
    }

    /* Small screens */
    @media all and (max-width: 500px) {
        nav {
            /* On small screens, we are no longer using row direction but column */
            flex-direction: column;
        }
    }
</style>