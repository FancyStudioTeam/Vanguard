import {
	type ChangeEvent,
	type ChangeEventHandler,
	type Dispatch,
	type SetStateAction,
	useCallback,
	useState,
} from 'react';

export function useFileInput(): FileInputData {
	const [file, setFile] = useState<File | null>(null);

	const onChange = useCallback(
		({ target }: ChangeEvent<HTMLInputElement>) => setFile(target.files?.item(0) ?? null),
		[],
	);

	return {
		file,
		onChange,
		setFile,
	};
}

export interface FileInputData {
	file: File | null;
	onChange: ChangeEventHandler<HTMLInputElement>;
	setFile: Dispatch<SetStateAction<File | null>>;
}
