import type {
	CreatePrismaGuildTicketPanel,
	GetDiscordGuildChannels,
} from '@vanguard/api-contracts/rest';

import { Select } from '@base-ui/react/select';
import { CheckIcon } from '@phosphor-icons/react';
import { CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';
import { useRevalidator } from 'react-router';
import useSwr from 'swr';
import useSwrMutation from 'swr/mutation';

import { Button, ButtonVariants } from '#components/UI/Button.tsx';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from '#components/UI/Dialog.tsx';
import { Field, FieldLabel } from '#components/UI/Field.tsx';
import { Input } from '#components/UI/Input.tsx';
import { createRequestUrl } from '#utils/URL/createRequestEndpoint.ts';

async function createTicketPanelRequest(
	requestUrl: string,
	{
		arg,
	}: {
		arg: {
			channel_id: string;
			title: string;
		};
	},
): Promise<CreatePrismaGuildTicketPanel> {
	const response = await fetch(requestUrl, {
		body: JSON.stringify(arg),
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
	});
	const responseJson = await response.json();

	if (!response.ok) {
		throw responseJson;
	}

	return responseJson;
}

export function PanelActionsCreate({ guildId }: PanelActionsCreateProps) {
	const { revalidate } = useRevalidator();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [channelId, setChannelId] = useState<string>('');
	const [title, setTitle] = useState<string>('');

	const { data = [] } = useSwr<GetDiscordGuildChannels>(
		createRequestUrl(`guilds/${guildId}/channels`),
	);
	const { trigger: triggerTicketPanelCreation } = useSwrMutation(
		createRequestUrl(`guilds/${guildId}/tickets/panels`),
		createTicketPanelRequest,
		{
			onError: ({ message }) => alert(message),
			onSuccess: () => {
				setIsOpen(false);
				revalidate();
			},
			throwOnError: true,
		},
	);

	return (
		<Dialog
			onOpenChange={setIsOpen}
			open={isOpen}
		>
			<DialogTrigger className={ButtonVariants()}>Create Panel</DialogTrigger>
			<DialogContent>
				<DialogTitle>Create a Panel</DialogTitle>
				<Field>
					<FieldLabel>Panel Name</FieldLabel>
					<Input
						defaultValue={title}
						onValueChange={(value) => setTitle(value)}
						placeholder='Moderator Applications'
						type='text'
					/>
				</Field>
				<Field>
					<FieldLabel>Panel Channel</FieldLabel>
					<Select.Root
						defaultValue={channelId}
						items={data.map(({ id, name }) => ({
							label: name,
							value: id,
						}))}
						onValueChange={(value) => setChannelId(String(value))}
					>
						<Select.Trigger className='flex items-center justify-between rounded-md border-2 border-neutral-700 bg-neutral-800 p-2 text-sm data-placeholder:text-neutral-400 data-placeholder:italic'>
							<Select.Value placeholder='Select a Channel' />
							<Select.Icon>
								<CaretUpDownIcon
									className='size-5 shrink-0'
									weight='fill'
								/>
							</Select.Icon>
						</Select.Trigger>
						<Select.Portal>
							<Select.Positioner className='z-50'>
								<Select.Popup className='w-[var(--anchor-width)] rounded-xl border-2 border-neutral-700 bg-neutral-900 p-2 shadow-md shadow-neutral-950 data-closed:animate-duration-100 data-closed:animate-fade-out-down data-open:animate-duration-150 data-open:animate-fade-in-down'>
									<Select.List className='relative overflow-y-auto'>
										{data.map(({ id, name }) => (
											<Select.Item
												className='flex cursor-pointer items-center justify-between rounded-md p-2 text-sm transition-colors hover:bg-neutral-800'
												key={name}
												value={id}
											>
												<Select.ItemText>{name}</Select.ItemText>
												<Select.ItemIndicator>
													<CheckIcon
														className='size-5 shrink-0'
														weight='fill'
													/>
												</Select.ItemIndicator>
											</Select.Item>
										))}
									</Select.List>
								</Select.Popup>
							</Select.Positioner>
						</Select.Portal>
					</Select.Root>
				</Field>
				<footer className='flex items-center justify-end gap-2'>
					<DialogClose className={ButtonVariants()}>Cancel</DialogClose>
					<Button
						onClick={() =>
							triggerTicketPanelCreation({
								channel_id: channelId,
								title,
							})
						}
						variant='success'
					>
						Create Panel
					</Button>
				</footer>
			</DialogContent>
		</Dialog>
	);
}

export interface PanelActionsCreateProps {
	guildId: string;
}
