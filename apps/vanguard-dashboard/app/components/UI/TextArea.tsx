import type { ComponentProps } from 'react';

export function TextArea({ ...props }: TextAreaProps) {
	return (
		<textarea
			className='h-50 resize-none rounded-3xl bg-neutral-800 px-4 py-2 text-sm caret-rose-500 outline-2 outline-transparent transition-colors duration-300 hover:outline-rose-500 focus:outline-rose-500'
			{...props}
		/>
	);
}

export type TextAreaProps = ComponentProps<'textarea'>;
