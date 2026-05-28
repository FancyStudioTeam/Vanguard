import type { DiscordUserGuild } from '@vanguard/api-contracts/interfaces';

export function GuildSelectorCardHeader({ banner, id }: GuildSelectorCardHeaderProps) {
	if (!banner) {
		return (
			<header className='h-25 w-full bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-900' />
		);
	}

	return (
		<header
			className='h-25 w-full bg-center bg-cover bg-no-repeat'
			style={{
				backgroundImage: `url(https://cdn.discordapp.com/banners/${id}/${banner}.webp?size=512&animated=true)`,
			}}
		/>
	);
}

export type GuildSelectorCardHeaderProps = Pick<DiscordUserGuild, 'banner' | 'id'>;
