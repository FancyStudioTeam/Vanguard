import { Input as InputPrimitive } from '@base-ui/react/input';

import { classNames } from '#utils/Tailwind/classNames.ts';

export function Input({ className, ...props }: InputProps) {
	return (
		<InputPrimitive
			className={classNames(
				'rounded-md border-2 border-neutral-700 bg-neutral-800 p-2 text-sm placeholder:text-neutral-400 placeholder:italic',
				className,
			)}
			{...props}
		/>
	);
}

export type InputProps = InputPrimitive.Props;
