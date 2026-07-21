import { Button } from '@vanguard/ui/Button.js';

import { Magic3Fill } from '@mingcute/react';
import { type ChangeEvent, type FocusEvent, useCallback, useRef, useState } from 'react';
import useSwrMutation from 'swr/mutation';

import { DashboardSectionCard } from '#components/Dashboard/DashboardSectionCard.tsx';
import { useFileInput } from '#hooks/useFileInput.ts';
import { useFileUrl } from '#hooks/useFileUrl.ts';
import { createRequestUrl } from '#utils/URL/createRequestEndpoint.ts';
import { BotCustomizationProfileEditor } from './Editor/ProfileEditor.tsx';

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

export function BotCustomization({ guildId }: BotCustomizationProps) {
	const {
		file: avatarFile,
		onChange: handleAvatarUpdate,
		setFile: setAvatarFile,
	} = useFileInput();
	const {
		file: bannerFile,
		onChange: handleBannerUpdate,
		setFile: setBannerFile,
	} = useFileInput();

	const avatarFileUrl = useFileUrl(avatarFile, '/Vanguard.avif');
	const bannerFileUrl = useFileUrl(bannerFile);

	const avatarFileInputRef = useRef<HTMLInputElement>(null);
	const bannerFileInputRef = useRef<HTMLInputElement>(null);

	const [biography, setBiography] = useState<string | null>(null);
	const [nickname, setNickname] = useState<string | null>(null);

	const handleAvatarRemoval = useCallback(
		() => setAvatarFile(null),
		[
			setAvatarFile,
		],
	);
	const handleAvatarUpload = useCallback(() => avatarFileInputRef.current?.click(), []);

	const handleBannerRemoval = useCallback(
		() => setBannerFile(null),
		[
			setBannerFile,
		],
	);
	const handleBannerUpload = useCallback(() => bannerFileInputRef.current?.click(), []);

	const handleBiographyUpdate = useCallback(
		({ target }: ChangeEvent<HTMLTextAreaElement>) => setBiography(target.value || null),
		[],
	);

	const handleNicknameBlur = useCallback(
		({ target }: FocusEvent<HTMLInputElement>) => {
			if (!nickname?.trim()) {
				target.value = 'Vanguard';

				setNickname(null);
			}
		},
		[
			nickname,
		],
	);
	const handleNicknameUpdate = useCallback(
		({ target }: ChangeEvent<HTMLInputElement>) => setNickname(target.value || null),
		[],
	);

	const { isMutating, trigger: triggerBotProfileUpdate } = useSwrMutation(
		createRequestUrl(`guilds/${guildId}/bot-profile`),
		createBotProfileUpdateRequest,
		{
			onError: ({ message }) => alert(message),
			onSuccess: () => alert('Profile Successfully Updated'),
			throwOnError: true,
		},
	);

	const handleUpdateProfileButtonClick = useCallback(async () => {
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
		<DashboardSectionCard
			description="Customize Vanguard's appearance for your Discord community."
			icon={Magic3Fill}
			title='Bot Customization'
		>
			<div className='flex flex-col gap-4'>
				<BotCustomizationProfileEditor
					avatarFile={avatarFile}
					avatarFileInputRef={avatarFileInputRef}
					avatarFileUrl={avatarFileUrl}
					bannerFile={bannerFile}
					bannerFileInputRef={bannerFileInputRef}
					bannerFileUrl={bannerFileUrl}
					biography={biography}
					handleAvatarRemoval={handleAvatarRemoval}
					handleAvatarUpdate={handleAvatarUpdate}
					handleAvatarUpload={handleAvatarUpload}
					handleBannerRemoval={handleBannerRemoval}
					handleBannerUpdate={handleBannerUpdate}
					handleBannerUpload={handleBannerUpload}
					handleBiographyUpdate={handleBiographyUpdate}
					handleNicknameBlur={handleNicknameBlur}
					handleNicknameUpdate={handleNicknameUpdate}
					nickname={nickname}
				/>
				<Button
					disabled={isMutating}
					onClick={handleUpdateProfileButtonClick}
				>
					{isMutating ? 'Loading...' : 'Update Profile'}
				</Button>
			</div>
		</DashboardSectionCard>
	);
}

export interface BotCustomizationProps {
	guildId: string;
}
