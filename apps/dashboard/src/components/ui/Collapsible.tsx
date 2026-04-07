import { Collapsible as RadixCollapsible } from 'radix-ui';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export function Collapsible({
	defaultOpen = true,
	...props
}: CollapsibleProps) {
	return (
		<RadixCollapsible.Root
			defaultOpen={defaultOpen}
			{...props}
		/>
	);
}

export function CollapsibleContent({
	className,
	...props
}: CollapsibleContentProps) {
	return (
		<RadixCollapsible.Content
			className={twMerge(
				'data-[state=open]:animate-duration-100 data-[state=open]:animate-fade-in-down',
				className,
			)}
			{...props}
		/>
	);
}

export function CollapsibleTrigger({
	className,
	...props
}: CollapsibleTriggerProps) {
	return (
		<RadixCollapsible.Trigger
			className={twMerge(
				'flex w-full cursor-pointer items-center rounded-md text-sm transition-colors hover:bg-neutral-800/75',
				className,
			)}
			{...props}
		/>
	);
}

export type CollapsibleContentProps = ComponentProps<
	typeof RadixCollapsible.Content
>;
export type CollapsibleProps = ComponentProps<typeof RadixCollapsible.Root>;
export type CollapsibleTriggerProps = ComponentProps<
	typeof RadixCollapsible.Trigger
>;
