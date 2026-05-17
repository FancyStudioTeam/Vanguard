import { WarningCircleIcon } from '@phosphor-icons/react';

import { Alert, AlertDescription } from '#components/UI/Alert.tsx';

export function GuildSelectorEmptyState() {
	return (
		<Alert variant='amber'>
			<WarningCircleIcon
				className='size-5 shrink-0'
				weight='fill'
			/>
			<AlertDescription>
				You don't have any servers available right now, or your servers couldn't be loaded properly.
			</AlertDescription>
		</Alert>
	);
}
