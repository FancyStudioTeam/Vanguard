import { Menu as MenuPrimitive } from '@base-ui/react/menu';

import { classNames } from '#utils/Tailwind/classNames.ts';

export function Menu({ ...props }: MenuProps) {
	return <MenuPrimitive.Root {...props} />;
}

export function MenuTrigger({ ...props }: MenuTriggerProps) {
	return <MenuPrimitive.Trigger {...props} />;
}

export function MenuContent({ className, ...props }: MenuContentProps) {
	return (
		<MenuPrimitive.Portal>
			<MenuPrimitive.Positioner className='z-50'>
				<MenuPrimitive.Popup
					className={classNames(
						'min-w-50 rounded-3xl border-2 border-zinc-800 bg-zinc-900 shadow-md shadow-zinc-950 outline-0 transition data-ending-style:scale-95 data-starting-style:scale-95 data-ending-style:opacity-0 data-starting-style:opacity-0',
						className,
					)}
					{...props}
				/>
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	);
}

export function MenuGroup({ className, ...props }: MenuGroupProps) {
	return (
		<MenuPrimitive.Group
			className={classNames('min-w-0 p-2')}
			{...props}
		/>
	);
}

export function MenuGroupLabel({ className, ...props }: MenuGroupLabelProps) {
	return (
		<MenuPrimitive.GroupLabel
			className={classNames(
				'truncate px-4 py-2 font-bold text-xs text-zinc-400 uppercase',
				className,
			)}
			{...props}
		/>
	);
}

export function MenuItem({ className, destructive, ...props }: MenuItemProps) {
	return (
		<MenuPrimitive.Item
			className={classNames(
				'flex h-10 cursor-pointer select-none items-center gap-2 truncate rounded-full px-4 py-2 font-semibold text-sm outline-0 transition active:scale-95 data-disabled:pointer-events-none data-highlighted:bg-rose-500 data-destructive:text-rose-500 data-highlighted:text-rose-50 data-disabled:opacity-75 [&>svg]:size-5 [&>svg]:shrink-0',
				className,
			)}
			data-destructive={destructive}
			{...props}
		/>
	);
}

export interface MenuItemProps extends MenuPrimitive.Item.Props {
	destructive?: boolean;
}

export type MenuContentProps = MenuPrimitive.Popup.Props;
export type MenuProps = MenuPrimitive.Root.Props;
export type MenuTriggerProps = MenuPrimitive.Trigger.Props;
export type MenuGroupLabelProps = MenuPrimitive.GroupLabel.Props;
export type MenuGroupProps = MenuPrimitive.Group.Props;
