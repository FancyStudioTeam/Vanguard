import 'client-only';
import useSwr from 'swr';
import type { User } from '#/lib/types/User.ts';

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export function useSession() {
	const {
		data: response,
		error,
		isLoading,
		isValidating,
	} = useSwr<SwrSessionEndpointResponse>('/api/auth/session', fetcher);

	const { data } = response ?? {};

	return {
		session: {
			data,
			error,
			isLoading,
			isValidating,
		},
	};
}

interface SwrSessionEndpointResponse {
	data: User | null;
	success: boolean;
}
