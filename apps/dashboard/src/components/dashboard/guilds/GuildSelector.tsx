import { InfoIcon, WarningOctagonIcon } from '@phosphor-icons/react/dist/ssr';
import type { ReactNode } from 'react';
import { match, P } from 'ts-pattern';
import { Alert, AlertDescription } from '#/components/ui/Alert.tsx';
import { getUserGuilds, UserGuildsDataStatus } from '#utils/Discord/getUserGuilds.ts';
import { GuildCard } from './GuildCard.tsx';

export async function GuildSelector({ accessToken }: GuildSelectorProps) {
	const userGuildsData = await getUserGuilds(accessToken);

	return match(userGuildsData)
		.returnType<ReactNode>()
		.with(
			{
				status: UserGuildsDataStatus.RateLimit,
			},
			() => (
				<Alert variant='rose'>
					<WarningOctagonIcon
						className='size-5 shrink-0'
						weight='fill'
					/>
					<AlertDescription>
						You are sending too many requests in a short period of time. Please try
						again in a few seconds.
					</AlertDescription>
				</Alert>
			),
		)
		.with(
			{
				status: UserGuildsDataStatus.Error,
			},
			() => (
				<Alert variant='rose'>
					<WarningOctagonIcon
						className='size-5 shrink-0'
						weight='fill'
					/>
					<AlertDescription>
						Something went wrong while your request was being processed. Please try
						again in a few seconds.
					</AlertDescription>
				</Alert>
			),
		)
		.with(
			{
				guilds: P.when(({ length: guildsLength }) => guildsLength > 0),
				status: UserGuildsDataStatus.Success,
			},
			() => (
				<Alert>
					<InfoIcon
						className='size-5 shrink-0'
						weight='fill'
					/>
					<AlertDescription>
						It seems you don't have a server where you have permissions...
					</AlertDescription>
				</Alert>
			),
		)
		.otherwise(({ guilds }) => (
			<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{guilds.map(({ id, ...guild }) => (
					<GuildCard
						id={id}
						key={id}
						{...guild}
					/>
				))}
			</div>
		));
}

export interface GuildSelectorProps {
	accessToken: string;
}
