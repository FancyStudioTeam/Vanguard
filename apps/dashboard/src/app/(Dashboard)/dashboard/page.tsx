import { Suspense } from 'react';
import { GuildSelector } from '#components/dashboard/guilds/GuildSelector.tsx';
import { GuildSelectorFallback } from '#components/dashboard/guilds/GuildSelectorFallback.tsx';
import { verifySession } from '#utils/Session/verifySession.ts';

export default async function () {
	const { credentials } = await verifySession(true);
	const { accessToken } = credentials;

	return (
		<>
			<h1 className='text-center font-bold text-2xl'>Welcome back!</h1>
			<Suspense fallback={<GuildSelectorFallback />}>
				<GuildSelector accessToken={accessToken} />
			</Suspense>
		</>
	);
}
