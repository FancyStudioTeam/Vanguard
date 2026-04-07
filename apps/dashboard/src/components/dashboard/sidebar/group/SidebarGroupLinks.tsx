import { CollapsibleContent } from '#components/ui/Collapsible.tsx';
import type { SidebarGroupProps } from './SidebarGroup.tsx';
import { SidebarGroupLink } from './SidebarGroupLink.tsx';

export function SidebarGroupLinks({ links }: SidebarGroupLinksProps) {
	return (
		<CollapsibleContent>
			{links.map(({ text, ...link }) => (
				<SidebarGroupLink
					key={text}
					text={text}
					{...link}
				/>
			))}
		</CollapsibleContent>
	);
}

export type SidebarGroupLinksProps = Pick<SidebarGroupProps, 'links'>;
