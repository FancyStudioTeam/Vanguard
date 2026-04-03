import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import type { ComponentProps } from 'react';

const buttonVariants = cva(
	'inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm transition-colors',
	{
		variants: {
			variant: {
				default: 'bg-neutral-50 text-neutral-950 hover:bg-neutral-50/75',
			},
		},
	},
);

export function Button({ asChild = false, className, variant = 'default', ...props }: ButtonProps) {
	const Component = asChild ? Slot.Slot : 'button';

	return (
		<Component
			className={buttonVariants({
				className,
				variant,
			})}
			{...props}
		/>
	);
}

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}
