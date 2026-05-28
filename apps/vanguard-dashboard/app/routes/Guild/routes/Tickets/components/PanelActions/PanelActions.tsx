import { PanelActionsDelete } from './PanelActionsDelete.tsx';

export function PanelActions(props: PanelActionsProps) {
	return (
		<span className='flex flex-row gap-2'>
			<PanelActionsDelete {...props} />
		</span>
	);
}

export interface PanelActionsProps {
	guildId: string;
	panelId: string;
}
