import type { PageLoad } from "./$types";
import { Provider } from '$lib/Provider';
import { redirect } from "@sveltejs/kit";

// check if we have provider and redirect otherwise
export const load = (async ({ params }) => {
    if(!Provider.isConnected()) {
        throw redirect(307, '/');
    }
}) satisfies PageLoad;