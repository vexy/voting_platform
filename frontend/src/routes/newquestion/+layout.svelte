<svelte:head>
    <meta name="description" content="Infoportal.app | Create your questions, ask masses, talk." />
		<meta name="keywords" content="question, MATIC, vote, blockchain, poll, survey, results, infoportal">

    <title>Infoportal.app | New question</title>

    <!-- Google analytics script -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-P0RR1V030Z"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
  
      gtag('config', 'G-P0RR1V030Z');
    </script>
</svelte:head>

<container>
    <slot />
</container>

<style>
  container {
      align-self: center;
  }
</style>