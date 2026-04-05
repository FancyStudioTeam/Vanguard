import { Suspense } from 'react';
import { GuildSelector } from '#components/dashboard/guilds/GuildSelector.tsx';
import { GuildSelectorFallback } from '#components/dashboard/guilds/GuildSelectorFallback.tsx';
import { PageLayout } from '#layouts/PageLayout.tsx';
import { verifySession } from '#utils/Session/verifySession.ts';

export default async function () {
	const { accessToken, user } = await verifySession(true);
	const { name } = user;

	return (
		<PageLayout>
			<h1 className='text-center font-bold text-2xl'>
				Welcome back, <span className='text-neutral-400'>{name}</span>!
			</h1>
			<Suspense fallback={<GuildSelectorFallback />}>
				<GuildSelector accessToken={accessToken} />
			</Suspense>
		</PageLayout>
	);
}
