import { GuildContext } from '#context/GuildContext.ts';
import { UserContext } from '#context/UserContext.ts';
import type { Route } from './+types/GuildHomePage';

export function loader({ context }: Route.LoaderArgs) {
	const user = context.get(UserContext);
	const guild = context.get(GuildContext);

	return {
		guild,
		user,
	};
}

export default function ({ loaderData }: Route.ComponentProps) {
	const { user } = loaderData;
	const { globalName, username } = user;

	return <h1 className='font-bold text-xl'>Welcome back, {globalName ?? username}!</h1>;
}
