import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';

import { classNames } from '#utils/Tailwind/classNames.ts';

export function Tabs({ className, ...props }: TabsProps) {
	return (
		<TabsPrimitive.Root
			className={classNames('flex w-full flex-col gap-4', className)}
			{...props}
		/>
	);
}

export function TabsIndicator({ className, ...props }: TabsIndicatorProps) {
	return (
		<TabsPrimitive.Indicator
			className={classNames(
				'absolute top-2 left-0 -z-1 h-[calc(100%-(--spacing(4)))] w-(--active-tab-width) translate-x-(--active-tab-left) rounded-full bg-rose-500 transition-[translate,width] duration-300',
				className,
			)}
			{...props}
		/>
	);
}

export function TabsList({ className, ...props }: TabsListProps) {
	return (
		<TabsPrimitive.List
			className={classNames(
				'relative z-1 flex w-fit flex-row items-center rounded-full bg-neutral-950 p-2',
				className,
			)}
			{...props}
		/>
	);
}

export function TabsPanel({ ...props }: TabsPanelProps) {
	return <TabsPrimitive.Panel {...props} />;
}

export function TabsTab({ className, ...props }: TabsTabProps) {
	return (
		<TabsPrimitive.Tab
			className={classNames(
				'cursor-pointer whitespace-nowrap rounded-full px-4 py-2 font-semibold text-sm transition duration-300 hover:text-rose-500 data-disabled:pointer-events-none data-active:text-rose-50 data-disabled:opacity-75',
				className,
			)}
			{...props}
		/>
	);
}

export type TabsIndicatorProps = TabsPrimitive.Indicator.Props;
export type TabsListProps = TabsPrimitive.List.Props;
export type TabsPanelProps = TabsPrimitive.Panel.Props;
export type TabsProps = TabsPrimitive.Root.Props;
export type TabsTabProps = TabsPrimitive.Tab.Props;
