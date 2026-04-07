import type { ReactNode } from 'react';
import { Sidebar } from '#components/dashboard/sidebar/Sidebar.tsx';
import { verifyGuild } from '#utils/Session/verifyGuild.ts';
import { verifySession } from '#utils/Session/verifySession.ts';

export default async function ({ children, params }: LayoutProps) {
	const { guildId } = await params;

	const { credentials, user } = await verifySession();

	const { accessToken } = credentials;
	const { id } = user;

	const guild = await verifyGuild(guildId, {
		accessToken,
		userId: id,
	});

	return (
		<div className='flex flex-row gap-6'>
			<Sidebar guild={guild} />
			<main className='flex w-full flex-col gap-6'>{children}</main>
		</div>
	);
}

interface LayoutProps {
	children: ReactNode;
	params: Promise<LayoutPropsParams>;
}

interface LayoutPropsParams {
	guildId: string;
}
