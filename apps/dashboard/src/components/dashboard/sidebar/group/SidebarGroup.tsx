import { Collapsible } from '#components/ui/Collapsible.tsx';
import type { SidebarGroupLinkProps as SidebarLinkInterface } from './SidebarGroupLink.tsx';
import { SidebarGroupLinks } from './SidebarGroupLinks.tsx';
import { SidebarGroupTrigger } from './SidebarGroupTrigger.tsx';

export function SidebarGroup({ links, name }: SidebarGroupProps) {
	return (
		<Collapsible>
			<SidebarGroupTrigger name={name} />
			<SidebarGroupLinks links={links} />
		</Collapsible>
	);
}

export interface SidebarGroupProps {
	links: SidebarLinkInterface[];
	name: string;
}
