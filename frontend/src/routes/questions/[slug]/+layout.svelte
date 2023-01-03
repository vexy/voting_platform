<svelte:head>
    <meta name="description" content="Infoportal.app | Your questions, your answers, your opinions." />
    <meta name="keywords" content="opinion, question, vote, blockchain, poll, survey">

    <title>Infoportal.app | Survey</title>
</svelte:head>

<container>
    <slot />
</container>

<style>
    container {
        /* to occupy entire width */
        flex-grow: 1;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
</style>