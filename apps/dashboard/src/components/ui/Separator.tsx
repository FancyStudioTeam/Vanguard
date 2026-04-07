import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';
import { classNames } from '#utils/Tailwind/classNames.ts';

export function Separator({
	className,
	orientation = 'horizontal',
	...props
}: SeparatorProps) {
	return (
		<SeparatorPrimitive
			className={classNames(
				'shrink-0 bg-neutral-800 data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-0.5',
				className,
			)}
			orientation={orientation}
			{...props}
		/>
	);
}

export type SeparatorProps = SeparatorPrimitive.Props;
