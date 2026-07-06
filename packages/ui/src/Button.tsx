import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

// biome-ignore lint/style/useComponentExportOnlyModules: (x)
export const ButtonVariants = cva(
	'flex h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-full border-2 border-transparent font-semibold text-sm transition active:scale-95 disabled:pointer-events-none disabled:opacity-75 [&>svg]:size-5 [&>svg]:shrink-0',
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
				ghost: 'hover:bg-zinc-800',
				outline: '!border-zinc-800 hover:bg-zinc-800',
				primary: 'bg-rose-500 text-rose-50 hover:opacity-75',
			},
		},
	},
);

export function Button({ className, variant, size, ...props }: ButtonProps) {
	return (
		<ButtonPrimitive
			className={ButtonVariants({
				className,
				size,
				variant,
			})}
			{...props}
		/>
	);
}

export type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof ButtonVariants>;
