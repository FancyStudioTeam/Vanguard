import type { UserGuild } from '#/lib/types/User.ts';

export function GuildCardHeader({ banner, id }: GuildHeaderProps) {
	if (!banner) {
		return (
			<header className='from h-25 w-full bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-900' />
		);
	}

	const guildBannerUrl = `https://cdn.discordapp.com/banners/${id}/${banner}.webp?size=512`;

	return (
		<header
			className='h-25 w-full bg-center bg-cover bg-no-repeat'
			style={{
				backgroundImage: `url(${guildBannerUrl})`,
			}}
		/>
	);
}

export type GuildHeaderProps = Pick<UserGuild, 'banner' | 'id'>;
