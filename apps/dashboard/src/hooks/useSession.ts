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
	const { data: responseData } = response ?? {};

	return {
		session: {
			error,
			isLoading,
			isValidating,
			responseData,
		},
	};
}

interface SwrSessionEndpointResponse {
	data: SwrSessionEndpointResponseData | null;
	success: boolean;
}

interface SwrSessionEndpointResponseData {
	user: User;
}
