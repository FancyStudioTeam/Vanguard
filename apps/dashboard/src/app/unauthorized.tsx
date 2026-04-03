import { redirect } from 'next/navigation';
import { BASE_URL } from '#/lib/Constants.ts';

export default function () {
	redirect(`${BASE_URL}/api/auth/sign-in`);
}
