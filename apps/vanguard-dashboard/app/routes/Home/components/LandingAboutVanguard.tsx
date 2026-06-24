import { useGSAP } from '@gsap/react';
import { SparkleIcon } from '@phosphor-icons/react';
import gsap from 'gsap';
import { type ReactNode, useRef } from 'react';

const VANGUARD_FEATURES: Feature[] = [
	{
		content: (
			<>
				<p>
					Vanguard <strong>is designed to be customized from scratch</strong> using YAML
					configuration files for each system.
				</p>
				<p>
					Thanks to this type of configuration, Vanguard{' '}
					<strong>is fully customizable</strong>.
				</p>
				<p className='italic'>Just like Zeppelin, but public!</p>
			</>
		),
		heading: 'A Different Kind of Multifunctional Bot',
	},
	{
		badge: (
			<span className='flex items-center gap-2 rounded-full bg-mauve-800 px-2 py-1 text-mauve-300 text-xs uppercase'>
				<SparkleIcon
					className='size-5 shrink-0'
					weight='fill'
				/>
				Premium
			</span>
		),
		content: (
			<>
				<p>
					Vanguard{' '}
					<strong>lets you customize the bot's profile icon, banner, and bio</strong> in
					your Discord community.
				</p>
				<p>
					This allows you to use Vanguard with a <strong>more customized brand</strong>.
				</p>
			</>
		),
		heading: 'Custom Branding',
	},
];

export function LandingAboutVanguard() {
	const sectionReference = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const featureCards = gsap.utils.toArray<HTMLElement>('.feature-card');

			featureCards.forEach((card) => {
				gsap.fromTo(
					card,
					{
						opacity: 0,
						y: 50,
					},
					{
						opacity: 1,
						scrollTrigger: {
							end: 'center center',
							scrub: true,
							start: 'top center',
							trigger: card,
						},
						y: 0,
					},
				);
			});
		},
		{
			scope: sectionReference,
		},
	);

	return (
		<section
			className='flex w-full flex-col px-8 xl:grid xl:grid-cols-2 xl:gap-32'
			ref={sectionReference}
		>
			<div className='sticky top-15 z-10 flex items-center justify-center xl:top-0 xl:z-0 xl:h-dvh xl:justify-end'>
				<h2 className='text-balance bg-linear-to-r from-neutral-50 to-neutral-400 bg-clip-text font-bold text-5xl/17 text-transparent xl:text-7xl/25'>
					Why Vanguard?
				</h2>
			</div>
			<div className='w-full max-w-xl'>
				{VANGUARD_FEATURES.map(({ badge, content, heading }) => (
					<section
						className='feature-card flex h-max w-full max-w-2xl flex-col justify-center gap-4 xl:min-h-dvh [&>p]:text-balance [&>p]:text-md [&>p]:text-neutral-400'
						key={heading}
					>
						<h3 className='flex items-center gap-4 text-balance font-bold text-3xl'>
							{heading}
							{badge}
						</h3>
						{content}
					</section>
				))}
			</div>
		</section>
	);
}

interface Feature {
	badge?: ReactNode;
	content: ReactNode;
	heading: string;
}
