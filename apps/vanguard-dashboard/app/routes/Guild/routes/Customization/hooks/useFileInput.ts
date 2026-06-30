import { type ChangeEvent, type ChangeEventHandler, useCallback, useState } from 'react';

export function useFileInput(): FileInputData {
	const [file, setFile] = useState<File | null>(null);

	const onChange = useCallback(
		({ target }: ChangeEvent<HTMLInputElement>) => setFile(target.files?.item(0) ?? null),
		[],
	);

	return {
		file,
		onChange,
	};
}

export interface FileInputData {
	file: File | null;
	onChange: ChangeEventHandler<HTMLInputElement>;
}
