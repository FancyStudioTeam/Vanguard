import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

// biome-ignore lint/style/useComponentExportOnlyModules: (x)
export const ButtonVariants = cva('flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm transition-colors', {
	defaultVariants: {
		variant: 'primary',
	},
	variants: {
		variant: {
			ghost: 'bg-transparent hover:bg-neutral-800',
			primary: 'bg-neutral-800 hover:bg-neutral-700',
		},
	},
});

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
	return (
		<ButtonPrimitive
			className={ButtonVariants({
				className,
				variant,
			})}
			{...props}
		/>
	);
}

export type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof ButtonVariants>;
