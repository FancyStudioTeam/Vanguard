import type { SessionGuild } from '#types/Auth.ts';
import { GuildHeaderBanner } from './GuildHeaderBanner.tsx';
import { GuildHeaderGradient } from './GuildHeaderGradient.tsx';

export function GuildHeader(props: GuildHeaderProps) {
	const { banner } = props;

	if (!banner) {
		return <GuildHeaderGradient />;
	}

	return <GuildHeaderBanner {...props} />;
}

export type GuildHeaderProps = Pick<SessionGuild, 'banner' | 'id'>;
