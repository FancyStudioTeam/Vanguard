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
			className={classNames('flex w-full cursor-pointer items-center justify-between rounded-md p-2 transition-colors', className)}
			{...props}
		/>
	);
}

export function CollapsiblePanel({ ...props }: CollapsiblePanelProps) {
	return <CollapsiblePrimitive.Panel {...props} />;
}

export type CollapsiblePanelProps = CollapsiblePrimitive.Panel.Props;
export type CollapsibleProps = CollapsiblePrimitive.Root.Props;
export type CollapsibleTriggerProps = CollapsiblePrimitive.Trigger.Props;
