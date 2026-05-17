import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';

import { classNames } from '#utils/Tailwind/classNames.ts';

export function Avatar({ className, ...props }: AvatarProps) {
	return (
		<AvatarPrimitive.Root
			className={classNames('shrink-0 select-none overflow-hidden rounded-md bg-neutral-800', className)}
			{...props}
		/>
	);
}

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
	return (
		<AvatarPrimitive.Fallback
			className={classNames('flex size-10 items-center justify-center rounded-md border-2 border-neutral-800 text-sm', className)}
			{...props}
		/>
	);
}

export function AvatarImage({ className, ...props }: AvatarImageProps) {
	return (
		<AvatarPrimitive.Image
			className={classNames('aspect-square size-10 rounded-md border-2 border-neutral-800', className)}
			{...props}
		/>
	);
}

export type AvatarFallbackProps = AvatarPrimitive.Fallback.Props;
export type AvatarImageProps = AvatarPrimitive.Image.Props;
export type AvatarProps = AvatarPrimitive.Root.Props;
