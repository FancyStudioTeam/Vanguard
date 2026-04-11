import { InfoIcon } from '@phosphor-icons/react';
import { Alert, AlertDescription } from '#components/UI/Alert.tsx';

export function GuildSelectorFallback() {
	return (
		<Alert>
			<InfoIcon
				className='size-5 shrink-0'
				weight='fill'
			/>
			<AlertDescription>
				We are loading your server list. This shouldn't take too long...
			</AlertDescription>
		</Alert>
	);
}
