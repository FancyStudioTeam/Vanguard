import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

const alertVariants = cva(
	'flex items-center gap-2 rounded-xl border-2 border-neutral-800 bg-neutral-900 p-4',
	{
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

export function Alert({
	className,
	variant = 'default',
	...props
}: AlertProps) {
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

export function AlertDescription({
	className,
	...props
}: AlertDescriptionProps) {
	return (
		<span
			className={twMerge('text-balance text-sm', className)}
			{...props}
		/>
	);
}

export type AlertDescriptionProps = ComponentProps<'span'>;
export type AlertProps = ComponentProps<'div'> &
	VariantProps<typeof alertVariants>;
