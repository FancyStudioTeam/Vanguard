import { InfoIcon } from '@phosphor-icons/react';

import { Alert, AlertDescription } from '#components/UI/Alert.tsx';

export function PanelsEmptyState() {
	return (
		<Alert>
			<InfoIcon
				className='size-5 shrink-0'
				weight='fill'
			/>
			<AlertDescription>This server does not have any panel created.</AlertDescription>
		</Alert>
	);
}
