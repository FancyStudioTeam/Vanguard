import { useLoaderData } from 'react-router';
import { getSession } from '#server/utils/Sessions/getSession.ts';
import type { Route } from './+types/dashboard';

export async function loader({ request }: Route.LoaderArgs) {
	return await getSession(request);
}

export default function () {
	// biome-ignore lint/correctness/useHookAtTopLevel: (x)
	const { user } = useLoaderData<typeof loader>();
	const { globalName, username } = user;

	return <h1>Dashboard, {globalName ?? username}</h1>;
}
