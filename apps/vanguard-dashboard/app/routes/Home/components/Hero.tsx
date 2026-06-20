import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/src/SplitText';
import { useRef } from 'react';

export function Hero() {
	const headingReference = useRef<HTMLHeadingElement>(null);

	useGSAP(
		() => {
			const headingReferenceValue = headingReference.current;

			const gsapTimeline = gsap.timeline();
			const gsapSplitText = SplitText.create(headingReferenceValue, {
				type: 'words',
			});

			gsapTimeline
				.set(headingReferenceValue, {
					visibility: 'visible',
				})
				.fromTo(
					gsapSplitText.words,
					{
						opacity: 0,
						y: -100,
					},
					{
						duration: 1,
						ease: 'back.out',
						opacity: 1,
						stagger: 0.15,
						y: 0,
					},
				);
		},
		{
			scope: headingReference,
		},
	);

	return (
		<h1
			className='invisible max-w-5xl text-wrap text-center font-bold text-7xl'
			ref={headingReference}
		>
			Build your own Discord community with Vanguard
		</h1>
	);
}
