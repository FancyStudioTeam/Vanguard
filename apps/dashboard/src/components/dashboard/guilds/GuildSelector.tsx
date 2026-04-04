import { InfoIcon, WarningOctagonIcon } from '@phosphor-icons/react/dist/ssr';
import { Alert, AlertDescription } from '#/components/ui/Alert.tsx';
import { getUserGuilds } from '#/utils/discord/getUserGuilds.ts';
import { GuildCard } from './GuildCard.tsx';

export async function GuildSelector({ accessToken }: GuildSelectorProps) {
	const { guilds, isError, isRateLimit } = await getUserGuilds(accessToken);
	const { length: guildsLength } = guilds;

	if (isRateLimit) {
		return (
			<Alert variant='rose'>
				<WarningOctagonIcon
					className='size-5 shrink-0'
					weight='fill'
				/>
				<AlertDescription>
					You are sending too many requests in a short period of time. Please try again in
					a few seconds.
				</AlertDescription>
			</Alert>
		);
	}

	if (isError) {
		return (
			<Alert variant='rose'>
				<WarningOctagonIcon
					className='size-5 shrink-0'
					weight='fill'
				/>
				<AlertDescription>
					Something went wrong while your request was being processed. Please try again in
					a few seconds.
				</AlertDescription>
			</Alert>
		);
	}

	if (!(guildsLength > 0)) {
		return (
			<Alert>
				<InfoIcon
					className='size-5 shrink-0'
					weight='fill'
				/>
				<AlertDescription>
					It seems you don't have a server where you have permissions...
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
			{guilds.map(({ id, ...guild }) => (
				<GuildCard
					id={id}
					key={id}
					{...guild}
				/>
			))}
		</div>
	);
}

export interface GuildSelectorProps {
	accessToken: string;
}
