import type { SessionEndpointDataResponse } from '#/lib/responses/Auth.ts';
import 'client-only';
import { useRouter } from 'next/navigation';
import useSwr from 'swr';

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export function useSession() {
	const {
		data: response,
		error,
		isLoading,
		isValidating,
	} = useSwr<SwrSessionEndpointResponse>('/api/auth/session', fetcher);

	const { data } = response ?? {};
	const { replace } = useRouter();

	return {
		session: {
			data,
			error,
			isLoading,
			isValidating,
		},
		signIn: () => replace('/api/auth/sign-in'),
	};
}

interface SwrSessionEndpointResponse {
	data: SessionEndpointDataResponse | null;
	success: boolean;
}
