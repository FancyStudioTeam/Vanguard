import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

// biome-ignore lint/style/useComponentExportOnlyModules: (x)
export const buttonVariants = cva(
	'flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm transition-colors',
	{
		variants: {
			variant: {
				default:
					'bg-neutral-50 text-neutral-950 hover:bg-neutral-50/75',
				ghost: 'bg-transparent hover:bg-neutral-800/75',
				secondary: 'bg-neutral-800 hover:bg-neutral-800/75',
			},
		},
	},
);

export function Button({
	className,
	variant = 'default',
	...props
}: ButtonProps) {
	return (
		<ButtonPrimitive
			className={buttonVariants({
				className,
				variant,
			})}
			{...props}
		/>
	);
}

export type ButtonProps = ButtonPrimitive.Props &
	VariantProps<typeof buttonVariants>;
