import {
	type ChangeEvent,
	type ChangeEventHandler,
	type RefObject,
	useCallback,
	useRef,
	useState,
} from 'react';

export function useFileInput(): FileInputData {
	const [file, setFile] = useState<File | null>(null);

	const inputRef = useRef<HTMLInputElement>(null);

	const onChange = useCallback(
		({ target }: ChangeEvent<HTMLInputElement>) => setFile(target.files?.item(0) ?? null),
		[],
	);
	const open = useCallback(() => inputRef.current?.click(), []);

	return {
		file,
		onChange,
		open,
		ref: inputRef,
	};
}

export interface FileInputData {
	file: File | null;
	onChange: ChangeEventHandler<HTMLInputElement>;
	open: () => void;
	ref: RefObject<HTMLInputElement | null>;
}
