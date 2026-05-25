import { TrashIcon } from '@phosphor-icons/react';
import type { useRevalidator } from 'react-router';
import useSwrMutation from 'swr/mutation';

import {
	AlertDialog,
	AlertDialogClose,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '#components/UI/AlertDialog.tsx';
import { ButtonVariants } from '#components/UI/Button.tsx';
import { createRequestUrl } from '#utils/URL/createRequestEndpoint.ts';

export function PanelActionsDelete({ guildId, panelId, revalidator }: PanelActionsDeleteProps) {
	const { trigger: triggerTicketPanelDeletion } = useSwrMutation(
		createRequestUrl(`guilds/${guildId}/tickets/panels/${panelId}`),
		(requestUrl: string) => {
			fetch(requestUrl, {
				credentials: 'include',
				method: 'DELETE',
			});
		},
		{
			onError: () => revalidator.revalidate(),
			onSuccess: () => revalidator.revalidate(),
		},
	);

	return (
		<AlertDialog>
			<AlertDialogTrigger
				className={ButtonVariants({
					size: 'icon',
					variant: 'danger',
				})}
			>
				<TrashIcon weight='fill' />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
				<AlertDialogDescription>This action cannot be undone and will permanently delete this panel.</AlertDialogDescription>
				<footer className='flex items-center justify-end gap-2'>
					<AlertDialogClose className={ButtonVariants()}>Cancel</AlertDialogClose>
					<AlertDialogClose
						className={ButtonVariants({
							variant: 'danger',
						})}
						onClick={() => triggerTicketPanelDeletion()}
					>
						Delete Permanently
					</AlertDialogClose>
				</footer>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export interface PanelActionsDeleteProps {
	guildId: string;
	panelId: string;
	revalidator: ReturnType<typeof useRevalidator>;
}
