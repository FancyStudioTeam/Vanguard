import { DownFill, PicFill } from '@mingcute/react';
import { type ChangeEvent, useCallback, useState } from 'react';

import { AccordionItem, AccordionPanel, AccordionTrigger } from '#components/UI/Accordion.tsx';
import { Input } from '#components/UI/Input.tsx';
import { Label } from '#components/UI/Label.tsx';
import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '#components/UI/Tabs.tsx';
import { TextArea } from '#components/UI/TextArea.tsx';
import { useFileInput } from '../../hooks/useFileInput.ts';
import { useFileUrl } from '../../hooks/useFileUrl.ts';
import { PreviewMemberList } from '../Preview/PreviewMemberList.tsx';
import { PreviewMemberProfile } from '../Preview/PreviewMemberProfile.tsx';

export function AccordionBotCustomization() {
	const {
		file: avatarFile,
		onChange: handleAvatarChange,
		open: handleAvatarOpen,
		ref: avatarInputRef,
	} = useFileInput();
	const {
		file: bannerFile,
		onChange: handleBannerChange,
		open: handleBannerOpen,
		ref: bannerInputRef,
	} = useFileInput();

	const [biography, setBiography] = useState<string | null>(null);
	const [nickname, setNickname] = useState<string | null>(null);

	const handleOnBiographyUpdate = useCallback(
		({ target }: ChangeEvent<HTMLTextAreaElement>) => setBiography(target.value || null),
		[],
	);
	const handleOnNicknameUpdate = useCallback(
		({ target }: ChangeEvent<HTMLInputElement>) => setNickname(target.value || null),
		[],
	);

	const avatarFileUrl = useFileUrl(avatarFile, '/Vanguard.avif');
	const bannerFileUrl = useFileUrl(bannerFile);

	return (
		<AccordionItem value='bot-customization'>
			<AccordionTrigger className='flex w-full cursor-pointer items-center justify-between rounded-3xl bg-neutral-900 p-6 duration-300 data-panel-open:rounded-b-none [&>svg]:rotate-90 data-panel-open:[&>svg]:rotate-0'>
				<ul className='min-w-0 text-start'>
					<li className='truncate font-bold text-md'>Bot Customization</li>
					<li className='text-neutral-400 text-sm'>
						Update the look of Vanguard within your Discord community.
					</li>
				</ul>
				<DownFill className='size-7.5 shrink-0 transition-transform duration-300' />
			</AccordionTrigger>
			<AccordionPanel className='flex flex-row gap-4 rounded-b-3xl border-neutral-800 border-t-2 bg-neutral-900 p-6'>
				<Tabs defaultValue='profile'>
					<TabsList>
						<TabsTab value='profile'>Profile</TabsTab>
						<TabsTab value='appearance'>Appearance</TabsTab>
						<TabsIndicator />
					</TabsList>
					<TabsPanel
						className='flex flex-col gap-4'
						value='profile'
					>
						<div className='flex flex-col gap-2'>
							<Label htmlFor='nickname'>Nickname</Label>
							<Input
								name='nickname'
								onChange={handleOnNicknameUpdate}
								value={nickname ?? ''}
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<Label htmlFor='biography'>Biography</Label>
							<TextArea
								name='biography'
								onChange={handleOnBiographyUpdate}
								value={biography ?? ''}
							/>
						</div>
					</TabsPanel>
					<TabsPanel
						className='flex flex-col gap-4'
						value='appearance'
					>
						<div className='flex flex-col gap-2'>
							<Label htmlFor='avatar'>Avatar Image</Label>
							<div className='relative size-35'>
								{avatarFile ? (
									<button
										className='absolute inset-0 aspect-square cursor-pointer overflow-hidden rounded-3xl bg-center bg-cover bg-no-repeat transition-opacity duration-300 hover:opacity-75'
										onClick={handleAvatarOpen}
										style={{
											backgroundImage: `url(${avatarFileUrl})`,
										}}
										type='button'
									/>
								) : (
									<button
										className='absolute inset-0 flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border-2 border-neutral-800 border-dashed transition-colors duration-300 hover:border-rose-500'
										onClick={handleAvatarOpen}
										type='button'
									>
										<PicFill className='size-10 shrink-0' />
										<span className='font-semibold text-xs'>
											Select an Image
										</span>
									</button>
								)}
								<input
									accept='image/*'
									hidden={true}
									name='avatar'
									onChange={handleAvatarChange}
									ref={avatarInputRef}
									type='file'
								/>
							</div>
						</div>
						<div className='flex flex-col gap-2'>
							<Label htmlFor='avatar'>Banner Image</Label>
							<div className='relative size-35'>
								{bannerFile ? (
									<button
										className='absolute inset-0 aspect-video cursor-pointer overflow-hidden rounded-3xl bg-center bg-cover bg-no-repeat transition-opacity duration-300 hover:opacity-75'
										onClick={handleBannerOpen}
										style={{
											backgroundImage: `url(${bannerFileUrl})`,
										}}
										type='button'
									/>
								) : (
									<button
										className='absolute inset-0 flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border-2 border-neutral-800 border-dashed transition-colors duration-300 hover:border-rose-500'
										onClick={handleBannerOpen}
										type='button'
									>
										<PicFill className='size-10 shrink-0' />
										<span className='font-semibold text-xs'>
											Select an Image
										</span>
									</button>
								)}
								<input
									accept='image/*'
									hidden={true}
									name='banner'
									onChange={handleBannerChange}
									ref={bannerInputRef}
									type='file'
								/>
							</div>
						</div>
					</TabsPanel>
				</Tabs>
				<section className='flex w-full max-w-xs flex-col gap-4'>
					<PreviewMemberList
						avatarUrl={avatarFileUrl}
						nickname={nickname}
					/>
					<PreviewMemberProfile
						avatarUrl={avatarFileUrl}
						bannerUrl={bannerFileUrl}
						biography={biography}
						nickname={nickname}
					/>
				</section>
			</AccordionPanel>
		</AccordionItem>
	);
}
