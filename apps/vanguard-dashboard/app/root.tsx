import './fonts.css';
import './tailwind.css';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { SplitText } from 'gsap/SplitText';
import type { ReactNode } from 'react';
import {
	isRouteErrorResponse,
	Links,
	Meta,
	type MetaDescriptor,
	Outlet,
	Scripts,
	ScrollRestoration,
	useRouteError,
} from 'react-router';
import { SWRConfig } from 'swr';
import { match } from 'ts-pattern';

gsap.registerPlugin(useGSAP, ScrambleTextPlugin, SplitText);

// biome-ignore lint/style/useComponentExportOnlyModules: (x)
export function meta(): MetaDescriptor[] {
	return [
		{
			title: 'Vanguard - ',
		},
	];
}

export default function App() {
	return (
		<SWRConfig
			value={{
				fetcher: (resource, init) =>
					fetch(resource, {
						...init,
						credentials: 'include',
						headers: {
							'Content-Type': 'application/json',
						},
					}).then((response) => response.json()),
			}}
		>
			<Outlet />
		</SWRConfig>
	);
}

export function Layout({ children }: LayoutProps) {
	return (
		<html lang='en-US'>
			<head>
				<meta charSet='utf-8' />
				<meta
					content='width=device-width, initial-scale=1'
					name='viewport'
				/>
				<Meta />
				<Links />
			</head>
			<body className='bg-neutral-950 font-general-sans font-medium text-zinc-50'>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();

	return (
		<main className='grid h-100 place-content-center rounded-xl border-2 border-neutral-700 border-dashed px-6'>
			{match(error)
				.returnType<ReactNode>()
				.when(isRouteErrorResponse, ({ statusText }) => (
					<h1 className='text-wrap font-bold text-5xl'>{statusText}</h1>
				))
				.otherwise(() => (
					<h1 className='text-wrap font-bold text-5xl'>Unknown Error</h1>
				))}
		</main>
	);
}

interface LayoutProps {
	children: ReactNode;
}
