import { Menu as MenuPrimitive } from '@base-ui/react/menu';

import { classNames } from '#utils/Tailwind/classNames.ts';

export function DropdownMenu({ ...props }: DropdownMenuProps) {
	return <MenuPrimitive.Root {...props} />;
}

export function DropdownMenuTrigger({ ...props }: DropdownMenuTriggerProps) {
	return <MenuPrimitive.Trigger {...props} />;
}

export function DropdownMenuContent({ className, ...props }: DropdownMenuContentProps) {
	return (
		<MenuPrimitive.Portal>
			<MenuPrimitive.Positioner className='z-50'>
				<MenuPrimitive.Popup
					className={classNames(
						'min-w-50 rounded-xl border-2 border-neutral-700 bg-neutral-900 p-2 shadow-md shadow-neutral-950 data-open:animate-duration-100 data-open:animate-fade-in-down',
						className,
					)}
					{...props}
				/>
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	);
}

export type DropdownMenuContentProps = MenuPrimitive.Popup.Props;
export type DropdownMenuProps = MenuPrimitive.Root.Props;
export type DropdownMenuTriggerProps = MenuPrimitive.Trigger.Props;
