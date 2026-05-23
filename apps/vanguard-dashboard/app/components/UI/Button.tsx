import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

// biome-ignore lint/style/useComponentExportOnlyModules: (x)
export const ButtonVariants = cva(
	'flex cursor-pointer items-center justify-center gap-2 rounded-md text-sm transition-colors [&>svg]:size-5 [&>svg]:shrink-0',
	{
		defaultVariants: {
			size: 'default',
			variant: 'primary',
		},
		variants: {
			size: {
				default: 'px-4 py-2',
				icon: 'p-2',
			},
			variant: {
				ghost: 'bg-transparent hover:bg-neutral-800',
				primary: 'bg-neutral-800 hover:bg-neutral-700',
			},
		},
	},
);

export function Button({ className, ...props }: ButtonProps) {
	return (
		<ButtonPrimitive
			className={ButtonVariants({
				className,
			})}
			{...props}
		/>
	);
}

export type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof ButtonVariants>;
