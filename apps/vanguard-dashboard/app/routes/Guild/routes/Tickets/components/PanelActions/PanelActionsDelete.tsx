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
import { BASE_API_URL } from '#lib/Shared.ts';

export function PanelActionsDelete({ guildId, panelId, revalidator }: PanelActionsDeleteProps) {
	const deletePanel = (requestUrl: string) => {
		fetch(requestUrl, {
			credentials: 'include',
			method: 'DELETE',
		});
	};

	const { trigger } = useSwrMutation(`${BASE_API_URL}/api/guilds/${guildId}/tickets/panels/${panelId}`, deletePanel, {
		onError: () => revalidator.revalidate(),
		onSuccess: () => revalidator.revalidate(),
	});

	return (
		<AlertDialog>
			<AlertDialogTrigger className='rounded-md bg-neutral-800 p-2 text-rose-400 text-sm transition-colors hover:bg-neutral-800/75'>
				<TrashIcon
					className='size-5 shrink-0'
					weight='fill'
				/>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
				<AlertDialogDescription>This action cannot be undone and will permanently delete this panel.</AlertDialogDescription>
				<footer className='flex items-center justify-end gap-2'>
					<AlertDialogClose>Cancel</AlertDialogClose>
					<AlertDialogClose
						className='text-rose-400'
						onClick={() => trigger()}
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
