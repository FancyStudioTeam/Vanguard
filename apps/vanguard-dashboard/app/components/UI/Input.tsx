import { Input as InputPrimitive } from '@base-ui/react/input';

import { classNames } from '#utils/Tailwind/classNames.ts';

export function Input({ className, ...props }: InputProps) {
	return (
		<InputPrimitive
			className={classNames(
				'h-10 rounded-full bg-neutral-800 px-4 py-2 text-sm caret-rose-500 outline-2 outline-transparent transition-colors duration-300 hover:outline-rose-500 focus:outline-rose-500',
				className,
			)}
			{...props}
		/>
	);
}

export type InputProps = InputPrimitive.Props;
