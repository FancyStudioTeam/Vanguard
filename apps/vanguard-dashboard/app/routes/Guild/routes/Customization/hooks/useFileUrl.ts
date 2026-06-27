import { useEffect, useState } from 'react';

export function useFileUrl(file: File | null): string | null;
export function useFileUrl(file: File | null, fallback: string): string;

export function useFileUrl(file: File | null, fallback?: string): string | null {
	const [objectUrl, setObjectUrl] = useState<string | null>(null);

	useEffect(() => {
		if (!file) {
			setObjectUrl(fallback ?? null);

			return;
		}

		const fileObjectUrl = URL.createObjectURL(file);

		setObjectUrl(fileObjectUrl);

		return () => URL.revokeObjectURL(fileObjectUrl);
	}, [
		file,
		fallback,
	]);

	return objectUrl;
}
