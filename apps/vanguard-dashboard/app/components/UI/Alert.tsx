import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

const AlertVariants = cva(
	'flex gap-2 rounded-xl border-2 border-neutral-700 bg-neutral-900 p-4 [&>svg]:top-0 [&>svg]:size-5 [&>svg]:shrink-0',
	{
		defaultVariants: {
			variant: 'default',
		},
		variants: {
			variant: {
				amber: 'text-amber-400',
				cyan: 'text-cyan-400',
				default: 'text-neutral-400',
				emerald: 'text-emerald-400',
				rose: 'text-rose-400',
			},
		},
	},
);

export function Alert({ className, ...props }: AlertProps) {
	return (
		<div
			className={AlertVariants({
				className,
			})}
			{...props}
		/>
	);
}

export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
	return (
		<span
			className={twMerge('text-balance font-bold text-sm', className)}
			{...props}
		/>
	);
}

export type AlertDescriptionProps = ComponentProps<'span'>;
export type AlertProps = ComponentProps<'div'> & VariantProps<typeof AlertVariants>;
