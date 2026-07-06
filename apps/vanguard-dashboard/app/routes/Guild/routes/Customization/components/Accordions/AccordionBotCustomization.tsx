import { Button } from '@vanguard/ui/Button.js';

import { DownFill, PicFill } from '@mingcute/react';
import { type ChangeEvent, useCallback, useId, useState } from 'react';
import useSwrMutation from 'swr/mutation';

import { AccordionItem, AccordionPanel, AccordionTrigger } from '#components/UI/Accordion.tsx';
import { Input } from '#components/UI/Input.tsx';
import { Label } from '#components/UI/Label.tsx';
import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from '#components/UI/Tabs.tsx';
import { TextArea } from '#components/UI/TextArea.tsx';
import { createRequestUrl } from '#utils/URL/createRequestEndpoint.ts';
import { useFileInput } from '../../hooks/useFileInput.ts';
import { useFileUrl } from '../../hooks/useFileUrl.ts';
import { PreviewMemberList } from '../Preview/PreviewMemberList.tsx';
import { PreviewMemberProfile } from '../Preview/PreviewMemberProfile.tsx';

async function createBotProfileUpdateRequest(
	requestUrl: string,
	{
		arg,
	}: {
		arg: {
			avatar: File | null;
			banner: File | null;
			biography: string | null;
			nickname: string | null;
		};
	},
): Promise<void> {
	const { avatar, banner, biography, nickname } = arg;

	const formData = new FormData();

	/*
	 * INFO: Empty values indicate that these properties should be reset to their
	 * default values.
	 */

	formData.append('avatar', avatar ?? '');
	formData.append('banner', banner ?? '');

	formData.append('biography', biography ?? '');
	formData.append('nickname', nickname ?? '');

	const response = await fetch(requestUrl, {
		body: formData,
		credentials: 'include',
		method: 'PUT',
	});

	if (!response.ok) {
		throw await response.json();
	}
}

export function AccordionBotCustomization({ guildId }: AccordionBotCustomizationProps) {
	const { file: avatarFile, onChange: handleAvatarChange } = useFileInput();
	const { file: bannerFile, onChange: handleBannerChange } = useFileInput();

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

	const avatarInputId = useId();
	const bannerInputId = useId();

	const { isMutating, trigger: triggerBotProfileUpdate } = useSwrMutation(
		createRequestUrl(`guilds/${guildId}/bot-profile`),
		createBotProfileUpdateRequest,
		{
			onError: ({ message }) => alert(message),
			onSuccess: () => alert('Profile Successfully Updated'),
			throwOnError: true,
		},
	);

	const handleOnButtonClick = useCallback(async () => {
		await triggerBotProfileUpdate({
			avatar: avatarFile,
			banner: bannerFile,
			biography,
			nickname,
		});
	}, [
		avatarFile,
		bannerFile,
		biography,
		nickname,
		triggerBotProfileUpdate,
	]);

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
			<AccordionPanel className='flex flex-col gap-4 rounded-b-3xl border-neutral-800 border-t-2 bg-neutral-900 p-6'>
				<section className='flex flex-row gap-4'>
					<Tabs defaultValue='profile'>
						<TabsList>
							<TabsTab value='profile'>Profile</TabsTab>
							<TabsTab value='appearance'>Appearance</TabsTab>
							<TabsTab
								disabled={true}
								value='display-names'
							>
								Display Names
							</TabsTab>
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
								{avatarFile ? (
									<Label
										className='aspect-square max-w-50 cursor-pointer overflow-hidden rounded-3xl bg-center bg-cover bg-no-repeat transition-opacity duration-300 hover:opacity-75'
										htmlFor={avatarInputId}
										style={{
											backgroundImage: `url(${avatarFileUrl})`,
										}}
									/>
								) : (
									<Label
										className='flex aspect-square max-w-50 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border-2 border-neutral-800 border-dashed transition-colors duration-300 hover:border-rose-500'
										htmlFor={avatarInputId}
									>
										<PicFill className='size-10 shrink-0' />
										<span className='font-semibold text-xs'>
											Select an Image
										</span>
									</Label>
								)}
								<input
									accept='image/*'
									hidden={true}
									id={avatarInputId}
									onChange={handleAvatarChange}
									type='file'
								/>
							</div>
							<div className='flex flex-col gap-2'>
								<Label htmlFor='avatar'>Banner Image</Label>
								{bannerFile ? (
									<Label
										className='aspect-video max-h-50 max-w-125 cursor-pointer overflow-hidden rounded-3xl bg-center bg-cover bg-no-repeat transition-opacity duration-300 hover:opacity-75'
										htmlFor={bannerInputId}
										style={{
											backgroundImage: `url(${bannerFileUrl})`,
										}}
									/>
								) : (
									<Label
										className='flex aspect-video max-h-50 max-w-125 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border-2 border-neutral-800 border-dashed transition-colors duration-300 hover:border-rose-500'
										htmlFor={bannerInputId}
									>
										<PicFill className='size-10 shrink-0' />
										<span className='font-semibold text-xs'>
											Select an Image
										</span>
									</Label>
								)}
								<input
									accept='image/*'
									hidden={true}
									id={bannerInputId}
									onChange={handleBannerChange}
									type='file'
								/>
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
				</section>
				<Button
					disabled={isMutating}
					onClick={handleOnButtonClick}
				>
					{isMutating ? 'Loading...' : 'Update Profile'}
				</Button>
			</AccordionPanel>
		</AccordionItem>
	);
}

export interface AccordionBotCustomizationProps {
	guildId: string;
}
