import { CheckFill } from '@mingcute/react';
import type { ChangeEventHandler, FocusEventHandler } from 'react';

import {
	BotCustomizationAvatarEditor,
	type BotCustomizationAvatarEditorProps,
} from './AvatarEditor.tsx';
import {
	BotCustomizationBannerEditor,
	type BotCustomizationBannerEditorProps,
} from './BannerEditor.tsx';

export function BotCustomizationProfileEditor({
	avatarFile,
	avatarFileInputRef,
	avatarFileUrl,
	bannerFile,
	bannerFileInputRef,
	bannerFileUrl,
	handleAvatarRemoval,
	handleAvatarUpload,
	handleAvatarUpdate,
	handleBannerRemoval,
	handleBannerUpdate,
	handleBannerUpload,
	handleNicknameUpdate,
	handleNicknameBlur,
	handleBiographyUpdate,
	nickname,
}: BotCustomizationProfileEditorProps) {
	return (
		<section className='max-w-xs overflow-hidden rounded-3xl bg-zinc-800'>
			<header className='relative'>
				<BotCustomizationBannerEditor
					bannerFile={bannerFile}
					bannerFileInputRef={bannerFileInputRef}
					bannerFileUrl={bannerFileUrl}
					handleBannerRemoval={handleBannerRemoval}
					handleBannerUpdate={handleBannerUpdate}
					handleBannerUpload={handleBannerUpload}
				/>
				<BotCustomizationAvatarEditor
					avatarFile={avatarFile}
					avatarFileInputRef={avatarFileInputRef}
					avatarFileUrl={avatarFileUrl}
					handleAvatarRemoval={handleAvatarRemoval}
					handleAvatarUpdate={handleAvatarUpdate}
					handleAvatarUpload={handleAvatarUpload}
				/>
			</header>
			<footer>
				<section className='mt-8.75'>
					<section className='flex flex-col gap-4 p-6'>
						<ul className='min-w-0'>
							<li className='flex items-center gap-2 font-semibold'>
								<input
									className='field-sizing-content min-w-0 truncate border-transparent border-b-2 font-semibold caret-rose-500 transition-colors placeholder:text-zinc-400 hover:border-rose-500 focus:border-rose-500 focus:outline-hidden'
									onBlur={handleNicknameBlur}
									onChange={handleNicknameUpdate}
									placeholder='Vanguard'
									spellCheck={false}
									value={nickname ?? ''}
								/>
								<span className='flex items-center gap-0.5 rounded-sm bg-indigo-500 px-1.5 py-0.5 text-indigo-50 text-xs uppercase'>
									<CheckFill className='size-3' />
									<span>App</span>
								</span>
							</li>
							<li className='text-sm'>Vanguard#1075</li>
						</ul>
						<textarea
							className='field-sizing-content resize-none whitespace-normal border-transparent border-b-2 text-sm caret-rose-500 transition-colors placeholder:text-zinc-400 hover:border-rose-500 focus:border-rose-500 focus:outline-hidden'
							onChange={handleBiographyUpdate}
							placeholder='Describe Vanguard!'
							spellCheck={false}
						/>
					</section>
				</section>
			</footer>
		</section>
	);
}

export interface BotCustomizationProfileEditorProps
	extends BotCustomizationAvatarEditorProps,
		BotCustomizationBannerEditorProps {
	biography: string | null;
	handleBiographyUpdate: ChangeEventHandler<HTMLTextAreaElement>;
	handleNicknameBlur: FocusEventHandler<HTMLInputElement>;
	handleNicknameUpdate: ChangeEventHandler<HTMLInputElement>;
	nickname: string | null;
}
