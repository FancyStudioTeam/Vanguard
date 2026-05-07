import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';

export function Separator({ orientation = 'horizontal', ...props }: SeparatorProps) {
	return (
		<SeparatorPrimitive
			className='bg-neutral-800 data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1'
			orientation={orientation}
			{...props}
		/>
	);
}

export type SeparatorProps = SeparatorPrimitive.Props;
