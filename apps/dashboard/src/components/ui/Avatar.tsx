import { Avatar as RadixAvatar } from 'radix-ui';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export function Avatar({ className, ...props }: AvatarProps) {
	return (
		<RadixAvatar.Root
			className={twMerge(
				'size-10 shrink-0 *:size-10 *:truncate *:rounded-md *:bg-neutral-800',
			)}
			{...props}
		/>
	);
}

export function AvatarFallback({ ...props }: AvatarFallbackProps) {
	return <RadixAvatar.Fallback {...props} />;
}

export function AvatarImage({ ...props }: AvatarImageProps) {
	return <RadixAvatar.Image {...props} />;
}

export type AvatarFallbackProps = ComponentProps<typeof RadixAvatar.Fallback>;
export type AvatarImageProps = ComponentProps<typeof RadixAvatar.Image>;
export type AvatarProps = ComponentProps<typeof RadixAvatar.Root>;
