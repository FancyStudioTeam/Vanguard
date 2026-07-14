import { Delete3Fill, Edit2Fill, UploadFill } from '@mingcute/react';
import type { ChangeEventHandler, RefObject } from 'react';

import {
	Menu,
	MenuContent,
	MenuGroup,
	MenuItem,
	MenuTrigger,
} from '#components/UI/DropdownMenu.tsx';
export function BotCustomizationBannerEditor({
	bannerFile,
	bannerFileInputRef,
	bannerFileUrl,
	handleBannerRemoval,
	handleBannerUpdate,
	handleBannerUpload,
}: BotCustomizationBannerEditorProps) {
	return (
		<section
			className='group/banner-editor h-25 bg-center bg-cover bg-rose-500 bg-no-repeat'
			style={{
				backgroundImage: bannerFileUrl ? `url(${bannerFileUrl})` : 'none',
			}}
		>
			<Menu>
				<MenuTrigger className='grid size-full cursor-pointer place-content-center bg-zinc-950/75 opacity-0 transition-opacity group-hover/banner-editor:opacity-100'>
					<Edit2Fill className='size-7.5 shrink-0' />
				</MenuTrigger>
				<MenuContent>
					<MenuGroup>
						<MenuItem onClick={handleBannerUpload}>
							<UploadFill />
							<span>Upload Banner</span>
						</MenuItem>
						<MenuItem
							destructive={true}
							disabled={!bannerFile}
							onClick={handleBannerRemoval}
						>
							<Delete3Fill />
							<span>Remove Banner</span>
						</MenuItem>
					</MenuGroup>
				</MenuContent>
			</Menu>
			<input
				accept='image/gif, image/png, image/jpeg'
				hidden={true}
				onChange={handleBannerUpdate}
				ref={bannerFileInputRef}
				type='file'
			/>
		</section>
	);
}

export interface BotCustomizationBannerEditorProps {
	bannerFile: File | null;
	bannerFileInputRef: RefObject<HTMLInputElement | null>;
	bannerFileUrl: string | null;
	handleBannerRemoval: () => void;
	handleBannerUpdate: ChangeEventHandler<HTMLInputElement>;
	handleBannerUpload: () => void;
}
