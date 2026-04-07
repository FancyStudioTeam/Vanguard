import type { UserGuild } from '#types/Discord.ts';
import { GuildHeaderBanner } from './GuildHeaderBanner.tsx';
import { GuildHeaderGradient } from './GuildHeaderGradient.tsx';

export function GuildHeader(props: GuildHeaderProps) {
	const { banner } = props;

	if (!banner) {
		return <GuildHeaderGradient />;
	}

	return <GuildHeaderBanner {...props} />;
}

export type GuildHeaderProps = Pick<UserGuild, 'banner' | 'id'>;
