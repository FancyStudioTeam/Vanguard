import './fonts.css';
import './tailwind.css';

import { ButtonVariants } from '@vanguard/ui/Button.js';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { type ReactNode, useRef } from 'react';
import {
	isRouteErrorResponse,
	Link,
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

import { PageLayout } from '#layouts/PageLayout.tsx';

gsap.registerPlugin(useGSAP, ScrambleTextPlugin, ScrollSmoother, ScrollTrigger, SplitText);

// biome-ignore lint/style/useComponentExportOnlyModules: (x)
export function meta(): MetaDescriptor[] {
	return [
		{
			title: 'Vanguard',
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
		<html
			className='scrollbar-gutter-stable scrollbar-thumb-rose-500 scrollbar-track-transparent scroll-smooth'
			lang='en-US'
			translate='no'
		>
			<head>
				<meta charSet='utf-8' />
				<meta
					content='width=device-width, initial-scale=1'
					name='viewport'
				/>
				<Meta />
				<Links />
			</head>
			<body className='bg-zinc-950 font-general-sans font-medium text-zinc-50 selection:bg-rose-500 selection:text-rose-50'>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();

	const headingReference = useRef<HTMLHeadingElement>(null);
	const linkReference = useRef<HTMLAnchorElement>(null);

	useGSAP(() => {
		const gsapTimeline = gsap.timeline();
		const gsapSplitWords = SplitText.create(headingReference.current, {
			type: 'words',
		});

		gsapTimeline.from(gsapSplitWords.words, {
			duration: 0.5,
			ease: 'back.out',
			opacity: 0,
			stagger: 0.075,
			y: 100,
		});
	});

	return (
		<PageLayout>
			<main className='mx-auto grid h-dvh min-h-125 w-full max-w-7xl place-content-center p-8'>
				{match(error)
					.returnType<ReactNode>()
					.when(isRouteErrorResponse, ({ status, statusText }) => (
						<section className='flex w-full max-w-xl flex-col gap-4'>
							<h1
								className='text-wrap text-center font-bold text-5xl'
								ref={headingReference}
							>
								{status}: {statusText}
							</h1>
							<Link
								className={ButtonVariants()}
								ref={linkReference}
								to='/'
							>
								Return to Home Page
							</Link>
						</section>
					))
					.otherwise(() => (
						<h1
							className='text-wrap font-bold text-5xl'
							ref={headingReference}
						>
							Unknown Error
						</h1>
					))}
			</main>
		</PageLayout>
	);
}

interface LayoutProps {
	children: ReactNode;
}
