import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

const alertVariants = cva(
	'flex items-center gap-2 rounded-xl border-2 border-neutral-800 bg-neutral-900 p-4 text-sm',
	{
		variants: {
			variant: {
				amber: 'text-amber-400',
				emerald: 'text-emerald-400',
				rose: 'text-rose-400',
			},
		},
	},
);

export function Alert({ className, variant, ...props }: AlertProps) {
	return (
		<div
			className={alertVariants({
				className,
				variant,
			})}
			{...props}
		/>
	);
}

export type AlertProps = ComponentProps<'div'> & VariantProps<typeof alertVariants>;
