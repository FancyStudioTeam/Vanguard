import { guildContext } from '#context/GuildContext.ts';
import { userContext } from '#context/UserContext.ts';
import type { Route } from './+types/home';

export function loader({ context }: Route.LoaderArgs) {
	const guild = context.get(guildContext);
	const user = context.get(userContext);

	return {
		guild,
		user,
	};
}

export default function ({ loaderData }: Route.ComponentProps) {
	const { user } = loaderData;
	const { global_name, username } = user;

	return <h1 className='font-bold text-xl'>Welcome back, {global_name ?? username}!</h1>;
}
