import type { ComponentProps } from 'react';

import { classNames } from '#utils/Tailwind/classNames.ts';

export function Label({ className, ...props }: LabelProps) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: (x)
		<label
			className={classNames('font-semibold text-xs uppercase', className)}
			{...props}
		/>
	);
}

export type LabelProps = ComponentProps<'label'>;
