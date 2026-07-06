import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible';

import { classNames } from '#utils/Tailwind/classNames.ts';

export function Collapsible({ className, ...props }: CollapsibleProps) {
	return (
		<CollapsiblePrimitive.Root
			className={classNames(className)}
			{...props}
		/>
	);
}

export function CollapsibleTrigger({ className, ...props }: CollapsibleTriggerProps) {
	return (
		<CollapsiblePrimitive.Trigger
			className={classNames('flex w-full cursor-pointer', className)}
			{...props}
		/>
	);
}

export function CollapsiblePanel({ className, ...props }: CollapsiblePanelProps) {
	return (
		<CollapsiblePrimitive.Panel
			className={classNames(
				'h-(--collapsible-panel-height) overflow-hidden transition-[height] data-ending-style:h-0 data-starting-style:h-0',
				className,
			)}
			{...props}
		/>
	);
}

export type CollapsiblePanelProps = CollapsiblePrimitive.Panel.Props;
export type CollapsibleProps = CollapsiblePrimitive.Root.Props;
export type CollapsibleTriggerProps = CollapsiblePrimitive.Trigger.Props;
