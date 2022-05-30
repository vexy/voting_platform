<p>Looks like you don't have Metamask browser extension connected.</p>
<p>Connect your wallet to get started</p>
<button class="nmr" on:click={startConnecting}>Connect</button>

<script>
    import MetaMaskOnboarding from '@metamask/onboarding';
    // const MetaMaskOnboarding = require('@metamask/onboarding');

    function startConnecting() {
        const brd = new MetaMaskOnboarding();
        brd.startOnboarding();
        console.log("Onboarding started...")
    }
</script>

<style>
    .nmr {
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
        background: #efefef;
        box-shadow: 2px 2px 4px #c8d0e7, -1px -1px 3px #fff;
        color: #585858;
    }
    .nmr:active {
        box-shadow: inset 1px 1px 3px #c8d0e7, inset -1px -1px 3px #fff;
    }

    /* credits to: https://markodenic.com/tools/buttons-generator/ */
</style>