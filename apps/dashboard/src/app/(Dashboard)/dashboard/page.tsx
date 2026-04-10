import { GuildSelector } from '#components/dashboard/guilds/GuildSelector.tsx';
import { verifySession } from '#utils/Session/verifySession.ts';

export default async function () {
	const { guilds } = await verifySession(true);

	return (
		<>
			<h1 className='text-center font-bold text-2xl'>Welcome back!</h1>
			<GuildSelector guilds={guilds} />
		</>
	);
}
