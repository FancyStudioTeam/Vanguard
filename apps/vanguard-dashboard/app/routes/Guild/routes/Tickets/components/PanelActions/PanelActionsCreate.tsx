import { useState } from 'react';
import useSwrMutation from 'swr/mutation';

import { ButtonVariants } from '#components/UI/Button.tsx';
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

export function PanelActionsCreate({ guildId }: PanelActionsCreateProps) {
	const [title, setTitle] = useState<string>('');

	const { trigger: triggerTicketPanelCreation } = useSwrMutation(
		createRequestUrl(`guilds/${guildId}/tickets/panels`),
		(
			requestUrl: string,
			{
				arg,
			}: {
				arg: {
					title: string;
				};
			},
		) => {
			fetch(requestUrl, {
				body: JSON.stringify(arg),
				credentials: 'include',
				method: 'POST',
			});
		},
	);

	return (
		<Dialog>
			<DialogTrigger className={ButtonVariants()}>Create Panel</DialogTrigger>
			<DialogContent>
				<DialogTitle>Create a Panel</DialogTitle>
				<Field>
					<FieldLabel>Panel Name</FieldLabel>
					<Input
						onValueChange={(value) => setTitle(value)}
						placeholder='Moderator Applications'
						type='text'
					/>
				</Field>
				<footer className='flex items-center justify-end gap-2'>
					<DialogClose className={ButtonVariants()}>Cancel</DialogClose>
					<DialogClose
						className={ButtonVariants({
							variant: 'success',
						})}
						onClick={() =>
							triggerTicketPanelCreation({
								title,
							})
						}
					>
						Create Panel
					</DialogClose>
				</footer>
			</DialogContent>
		</Dialog>
	);
}

export interface PanelActionsCreateProps {
	guildId: string;
}
