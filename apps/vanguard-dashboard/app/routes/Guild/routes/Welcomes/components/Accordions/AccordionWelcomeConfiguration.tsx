import { DownFill } from '@mingcute/react';
import { useCallback, useState } from 'react';

import { AccordionItem, AccordionPanel, AccordionTrigger } from '#components/UI/Accordion.tsx';
import { Editor } from '#components/UI/Editor.tsx';

export function AccordionWelcomeConfiguration() {
	const [code, setCode] = useState<string>('');
	// const [codeBuffer, setCodeBuffer] = useState<Buffer | null>(null);

	const handleOnCodeUpdate = useCallback((value: string) => setCode(value), []);

	return (
		<AccordionItem value='welcomes-configuration'>
			<AccordionTrigger className='flex w-full cursor-pointer items-center justify-between rounded-3xl bg-neutral-900 p-6 duration-300 data-panel-open:rounded-b-none [&>svg]:rotate-90 data-panel-open:[&>svg]:rotate-0'>
				<ul className='min-w-0 text-start'>
					<li className='truncate font-bold text-md'>Welcomes Configuration</li>
					<li className='text-neutral-400 text-sm'>
						Configure the welcome system using YAML configuration.
					</li>
				</ul>
				<DownFill className='size-7.5 shrink-0 transition-transform duration-300' />
			</AccordionTrigger>
			<AccordionPanel className='overflow-hidden rounded-b-3xl border-neutral-800 border-t-2 bg-neutral-900 py-6'>
				<Editor
					code={code}
					onChange={handleOnCodeUpdate}
				/>
			</AccordionPanel>
		</AccordionItem>
	);
}
