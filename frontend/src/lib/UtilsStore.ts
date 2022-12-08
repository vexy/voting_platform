import { writable } from "svelte/store";

// define three stores
export const hasMetamaskProvider = writable<boolean>(false);
export const isProviderConnected = writable<boolean>(false);
export const isRegisteredUser = writable<boolean>(false);