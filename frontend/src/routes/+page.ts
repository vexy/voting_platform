import detectEthereumProvider from '@metamask/detect-provider';

/** @type {import('./$types').PageLoad } */
export async function load({ params }) {
    // const provider = await detectEthereumProvider();
    // if (provider) {
    //     // From now on, this should always be true:
    //     // provider === window.ethereum
    //     return { hasProvider: true };
    // }

    return { hasProvider: false };
}