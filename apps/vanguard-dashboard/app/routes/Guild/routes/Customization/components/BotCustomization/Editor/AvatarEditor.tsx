import { Delete3Fill, Edit2Fill, UploadFill } from '@mingcute/react';
import type { ChangeEventHandler, RefObject } from 'react';

import {
	Menu,
	MenuContent,
	MenuGroup,
	MenuItem,
	MenuTrigger,
} from '#components/UI/DropdownMenu.tsx';

export function BotCustomizationAvatarEditor({
	avatarFile,
	avatarFileUrl,
	handleAvatarRemoval,
	handleAvatarUpload,
	handleAvatarUpdate,
	avatarFileInputRef,
}: BotCustomizationAvatarEditorProps) {
	return (
		<span className='absolute -bottom-8.75 left-6 z-10'>
			<span
				className='group/avatar-editor block size-17.5 overflow-hidden rounded-full bg-center bg-cover bg-no-repeat ring-6 ring-zinc-800 transition-opacity'
				style={{
					backgroundImage: `url(${avatarFileUrl})`,
				}}
			>
				<Menu>
					<MenuTrigger className='grid size-full cursor-pointer place-content-center bg-zinc-950/75 opacity-0 transition-opacity group-hover/avatar-editor:opacity-100'>
						<Edit2Fill className='size-7.5 shrink-0' />
					</MenuTrigger>
					<MenuContent>
						<MenuGroup>
							<MenuItem onClick={handleAvatarUpload}>
								<UploadFill />
								<span>Upload Avatar</span>
							</MenuItem>
							<MenuItem
								destructive={true}
								disabled={!avatarFile}
								onClick={handleAvatarRemoval}
							>
								<Delete3Fill />
								<span>Remove Avatar</span>
							</MenuItem>
						</MenuGroup>
					</MenuContent>
				</Menu>
				<input
					accept='image/gif, image/png, image/jpeg'
					hidden={true}
					onChange={handleAvatarUpdate}
					ref={avatarFileInputRef}
					type='file'
				/>
			</span>
			<span className='absolute right-0 bottom-0 size-5 rounded-full bg-emerald-500 ring-6 ring-zinc-800' />
		</span>
	);
}

export interface BotCustomizationAvatarEditorProps {
	avatarFile: File | null;
	avatarFileInputRef: RefObject<HTMLInputElement | null>;
	avatarFileUrl: string;
	handleAvatarRemoval: () => void;
	handleAvatarUpdate: ChangeEventHandler<HTMLInputElement>;
	handleAvatarUpload: () => void;
}
