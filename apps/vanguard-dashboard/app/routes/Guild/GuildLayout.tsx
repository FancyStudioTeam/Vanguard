import { type MetaDescriptor, Outlet } from 'react-router';

import { GuildContext } from '#context/GuildContext.ts';
import { UserContext } from '#context/UserContext.ts';
import { getGuild } from '#server/utils/API/getGuild.ts';
import { getUser } from '#server/utils/API/getUser.ts';
import type { Route } from './+types/GuildLayout';
import { Sidebar } from './components/Sidebar/Sidebar.tsx';

export function meta(): MetaDescriptor[] {
	return [
		{
			title: 'Vanguard',
		},
		{
			robots: 'noindex, nofollow',
		},
	];
}

const authMiddleware: Route.MiddlewareFunction = async ({ context, params, request }) => {
	const { guildId } = params;

	const guild = await getGuild(request, guildId);
	const user = await getUser(request);

	context.set(GuildContext, guild);
	context.set(UserContext, user);
};

export const middleware: Route.MiddlewareFunction[] = [
	authMiddleware,
];

export function loader({ context }: Route.LoaderArgs) {
	const guild = context.get(GuildContext);
	const user = context.get(UserContext);

	return {
		guild,
		user,
	};
}

export default function ({ loaderData }: Route.ComponentProps) {
	const { guild } = loaderData;

	return (
		<div>
			<Sidebar guild={guild} />
			<div className='p-8 md:ml-90'>
				<main className='mx-auto flex w-full max-w-5xl flex-col gap-6'>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
