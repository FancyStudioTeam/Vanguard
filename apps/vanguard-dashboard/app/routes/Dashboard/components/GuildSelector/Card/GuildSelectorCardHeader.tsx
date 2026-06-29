import type { APIUserGuild } from '@vanguard/api-contracts/interfaces';

import { GuildSelectorCardHeaderIcon } from './GuildSelectorCardHeaderIcon.tsx';

export function GuildSelectorCardHeader({ banner, icon, id }: GuildSelectorCardHeaderProps) {
	if (!banner) {
		return (
			<header className='grid h-40 place-content-center rounded-3xl bg-linear-to-br from-neutral-950 to-neutral-900'>
				<GuildSelectorCardHeaderIcon
					icon={icon}
					id={id}
				/>
			</header>
		);
	}

	return (
		<header
			className='h-40 overflow-hidden rounded-3xl bg-center bg-cover bg-no-repeat'
			style={{
				backgroundImage: `url(https://cdn.discordapp.com/banners/${id}/${banner}.webp?size=512&animated=true)`,
			}}
		>
			<div className='grid size-full place-content-center backdrop-blur-xl'>
				<GuildSelectorCardHeaderIcon
					icon={icon}
					id={id}
				/>
			</div>
		</header>
	);
}

export type GuildSelectorCardHeaderProps = Pick<APIUserGuild, 'banner' | 'icon' | 'id'>;
