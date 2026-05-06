import './fonts.css';
import './tailwind.css';

import type { ReactNode } from 'react';
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from 'react-router';
import { match } from 'ts-pattern';

import { Navbar } from '#components/Layout/Navbar/Navbar.tsx';

// biome-ignore lint/style/useComponentExportOnlyModules: (x)
export function meta() {
	return [
		{
			title: 'Vanguard',
		},
	];
}

export default function App() {
	return <Outlet />;
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
			<body className='w-full bg-neutral-950 font-general-sans font-medium text-zinc-50 selection:bg-neutral-50 selection:text-neutral-950'>
				<div className='mx-auto my-6 flex w-full max-w-7xl flex-col gap-6 px-6'>
					<Navbar />
					{children}
				</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();

	return (
		<main className='grid h-100 place-content-center rounded-xl border-2 border-neutral-800 border-dashed px-6'>
			{match(error)
				.returnType<ReactNode>()
				.when(isRouteErrorResponse, ({ statusText }) => <h1 className='text-wrap font-bold text-5xl'>{statusText}</h1>)
				.otherwise(() => (
					<h1 className='text-wrap font-bold text-5xl'>Unknown Error</h1>
				))}
		</main>
	);
}

interface LayoutProps {
	children: ReactNode;
}
