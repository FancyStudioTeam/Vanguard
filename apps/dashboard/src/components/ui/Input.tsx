import { Input as InputPrimitive } from '@base-ui/react/input';
import { classNames } from '#utils/Tailwind/classNames.ts';

export function Input({ className, type, ...props }: InputProps) {
	return (
		<InputPrimitive
			className={classNames(
				'w-full max-w-100 rounded-md bg-neutral-800 p-2 text-sm focus-visible:border-ring',
				className,
			)}
			type={type}
			{...props}
		/>
	);
}

export type InputProps = InputPrimitive.Props;
