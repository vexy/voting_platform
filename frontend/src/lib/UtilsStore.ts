import { writable } from "svelte/store";
import { PlatformMeta } from "./Models";

// platform meta store
function setupPlatormMetaStore() {
    const { set, update, subscribe } = writable(
        new PlatformMeta(0, 0, false, false, false)
    );

    return {
        subscribe,
        registered: (isRegistered: boolean) => update(pm => 
            new PlatformMeta(
                pm.totalUsers,
                pm.totalQuestions,
                isRegistered,
                pm.hasMetamask,
                pm.isConnected
            )
        ),
        connect: (isConnected: boolean) => update(pm => 
            new PlatformMeta(
                pm.totalUsers,
                pm.totalQuestions,
                pm.isRegistered,
                pm.hasMetamask,
                isConnected
            )
        ),
        metamaskDetected: (isDetected: boolean) => update(pm => 
            new PlatformMeta(
                pm.totalUsers,
                pm.totalQuestions,
                pm.isRegistered,
                isDetected,
                pm.isConnected
            )
        ),

        updateUserCount: (newCount: number) => update(pm =>
            new PlatformMeta(
                newCount,
                pm.totalQuestions,
                pm.isRegistered,
                pm.hasMetamask,
                pm.isConnected
            )
        ),

        updateQuestionsCount: (newCount: number) => update(pm =>
            new PlatformMeta(
                pm.totalUsers,
                newCount,
                pm.isRegistered,
                pm.hasMetamask,
                pm.isConnected
            )
        )
    }
}

export const PlatformStore = setupPlatormMetaStore();