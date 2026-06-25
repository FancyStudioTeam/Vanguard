import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

// biome-ignore lint/style/useComponentExportOnlyModules: (x)
export const ButtonVariants = cva(
	'flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-transparent font-semibold text-sm transition-colors [&>svg]:size-5 [&>svg]:shrink-0',
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
				outline: '!border-neutral-800 hover:bg-neutral-800',
				primary: 'bg-rose-500 text-rose-50 transition-opacity hover:opacity-75',
			},
		},
	},
);

export function Button({ className, variant, ...props }: ButtonProps) {
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
