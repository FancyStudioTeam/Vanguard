import { Avatar as RadixAvatar } from 'radix-ui';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export function Avatar({ className, ...props }: AvatarProps) {
	return (
		<RadixAvatar.Root
			className={twMerge('shrink-0 select-none overflow-hidden', className)}
			{...props}
		/>
	);
}

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
	return (
		<RadixAvatar.Fallback
			className={twMerge(
				'flex size-10 items-center justify-center rounded-md border-2 border-neutral-800 bg-neutral-800 text-sm',
				className,
			)}
			{...props}
		/>
	);
}

export function AvatarImage({ className, ...props }: AvatarImageProps) {
	return (
		<RadixAvatar.Image
			className={twMerge(
				'aspect-square size-10 rounded-md border-2 border-neutral-800',
				className,
			)}
			{...props}
		/>
	);
}

export type AvatarFallbackProps = ComponentProps<typeof RadixAvatar.Fallback>;
export type AvatarImageProps = ComponentProps<typeof RadixAvatar.Image>;
export type AvatarProps = ComponentProps<typeof RadixAvatar.Root>;
