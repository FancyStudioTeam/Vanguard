import { DropdownMenu as RadixDropdownMenu } from 'radix-ui';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export function DropdownMenu({ ...props }: DropdownMenuProps) {
	return <RadixDropdownMenu.Root {...props} />;
}

export function DropdownMenuContent({ className, ...props }: DropdownMenuContentProps) {
	return (
		<RadixDropdownMenu.Portal>
			<RadixDropdownMenu.Content
				className={twMerge(
					'z-50 flex w-60 max-w-60 flex-col gap-2 rounded-xl border-2 border-neutral-800 bg-neutral-900 p-2 shadow-md shadow-neutral-950/50 data-[state=open]:animate-duration-100 data-[state=open]:animate-fade-in-down',
					className,
				)}
				sideOffset={7.5}
				{...props}
			/>
		</RadixDropdownMenu.Portal>
	);
}

export function DropdownMenuGroup({ ...props }: DropdownMenuGroupProps) {
	return <RadixDropdownMenu.Group {...props} />;
}

export function DropdownMenuItem({ className, ...props }: DropdownMenuItemProps) {
	return (
		<RadixDropdownMenu.Item
			className={twMerge(
				'flex items-center gap-2 rounded-md p-2 text-sm transition-colors hover:bg-neutral-800/75',
				className,
			)}
			{...props}
		/>
	);
}

export function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
	return (
		<RadixDropdownMenu.Separator
			className={twMerge('h-0.5 bg-neutral-800', className)}
			{...props}
		/>
	);
}

export function DropdownMenuTrigger({ ...props }: DropdownMenuTriggerProps) {
	return <RadixDropdownMenu.Trigger {...props} />;
}

export type DropdownMenuContentProps = ComponentProps<typeof RadixDropdownMenu.Content>;
export type DropdownMenuGroupProps = ComponentProps<typeof RadixDropdownMenu.Group>;
export type DropdownMenuItemProps = ComponentProps<typeof RadixDropdownMenu.Item>;
export type DropdownMenuProps = ComponentProps<typeof RadixDropdownMenu.Root>;
export type DropdownMenuSeparatorProps = ComponentProps<typeof RadixDropdownMenu.Separator>;
export type DropdownMenuTriggerProps = ComponentProps<typeof RadixDropdownMenu.Trigger>;
