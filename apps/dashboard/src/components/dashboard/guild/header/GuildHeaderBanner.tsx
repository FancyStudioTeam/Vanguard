import { guildBannerUrl } from '@discordeno/utils';
import type { GuildHeaderProps } from './GuildHeader.tsx';

export function GuildHeaderBanner({ banner, id }: GuildHeaderBannerProps) {
	return (
		<header
			className='h-25 w-full bg-center bg-cover bg-no-repeat'
			style={{
				backgroundImage: `url(${guildBannerUrl(id, {
					banner: banner ?? undefined,
				})})`,
			}}
		/>
	);
}

export type GuildHeaderBannerProps = GuildHeaderProps;
