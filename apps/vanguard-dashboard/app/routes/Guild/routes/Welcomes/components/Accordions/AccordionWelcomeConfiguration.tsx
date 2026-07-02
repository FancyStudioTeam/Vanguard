import { DownFill } from '@mingcute/react';
import { useCallback, useState } from 'react';
import useSwrMutation from 'swr/mutation';

import { AccordionItem, AccordionPanel, AccordionTrigger } from '#components/UI/Accordion.tsx';
import { Button } from '#components/UI/Button.tsx';
import { Editor } from '#components/UI/Editor.tsx';
import { createRequestUrl } from '#utils/URL/createRequestEndpoint.ts';

async function createWelcomeConfigurationUpdateRequest(
	requestUrl: string,
	{
		arg,
	}: {
		arg: {
			code: string;
		};
	},
): Promise<void> {
	const { code } = arg;

	const textEncoder = new TextEncoder();

	const textEncoderResult = textEncoder.encode(code) as Uint8Array;
	const textEncoderResultBase64 = textEncoderResult.toBase64();

	const requestBody = JSON.stringify({
		data: textEncoderResultBase64,
	});

	const response = await fetch(requestUrl, {
		body: requestBody,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'PUT',
	});

	if (!response.ok) {
		throw await response.json();
	}
}

export function AccordionWelcomeConfiguration({ guildId }: AccordionWelcomeConfigurationProps) {
	const [code, setCode] = useState<string>('');

	const handleOnCodeUpdate = useCallback((value: string) => setCode(value), []);

	const { isMutating, trigger: triggerWelcomeConfigurationUpdate } = useSwrMutation(
		createRequestUrl(`guilds/${guildId}/welcomes/yaml`),
		createWelcomeConfigurationUpdateRequest,
		{
			onError: ({ message }) => alert(message),
			onSuccess: () => alert('Configuration Successfully Updated'),
			throwOnError: true,
		},
	);

	const handleOnButtonClick = useCallback(async () => {
		await triggerWelcomeConfigurationUpdate({
			code,
		});
	}, [
		code,
		triggerWelcomeConfigurationUpdate,
	]);

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
			<AccordionPanel className='flex flex-col gap-4 overflow-hidden rounded-b-3xl border-neutral-800 border-t-2 bg-neutral-900 py-6'>
				<Editor
					code={code}
					onChange={handleOnCodeUpdate}
				/>
				<Button
					className={'mx-4'}
					disabled={isMutating}
					onClick={handleOnButtonClick}
				>
					{isMutating ? 'Loading...' : 'Update Configuration'}
				</Button>
			</AccordionPanel>
		</AccordionItem>
	);
}

export interface AccordionWelcomeConfigurationProps {
	guildId: string;
}
