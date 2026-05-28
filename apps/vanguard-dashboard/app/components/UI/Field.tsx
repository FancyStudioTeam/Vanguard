import { Field as FieldPrimitive } from '@base-ui/react/field';

import { classNames } from '#utils/Tailwind/classNames.ts';

export function Field({ className, ...props }: FieldProps) {
	return (
		<FieldPrimitive.Root
			className={classNames('flex flex-col gap-2', className)}
			{...props}
		/>
	);
}

export function FieldLabel({ className, ...props }: FieldLabelProps) {
	return (
		<FieldPrimitive.Label
			className={classNames('font-bold text-sm', className)}
			{...props}
		/>
	);
}

export type FieldLabelProps = FieldPrimitive.Label.Props;
export type FieldProps = FieldPrimitive.Root.Props;
