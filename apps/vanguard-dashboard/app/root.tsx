import './fonts.css';
import './tailwind.css';

import type { ReactNode } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

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
					{children}
				</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

interface LayoutProps {
	children: ReactNode;
}
