import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/src/SplitText';
import { useRef } from 'react';

export function LandingHeroSection() {
	const headingReference = useRef<HTMLHeadingElement>(null);

	useGSAP(() => {
		const headingReferenceValue = headingReference.current;

		const gsapSplitText = SplitText.create(headingReferenceValue, {
			type: 'words',
		});

		gsap.from(gsapSplitText.words, {
			duration: 1,
			ease: 'back.out',
			opacity: 0,
			scrollTrigger: {
				toggleActions: 'restart none restart none',
				trigger: headingReferenceValue,
			},
			stagger: 0.075,
			y: 100,
		});
	});

	return (
		<section className='grid h-dvh min-h-125 place-items-center bg-[url("/Background.svg")] bg-center bg-cover bg-no-repeat px-8'>
			<h1
				className='max-w-5xl text-wrap text-center font-bold text-5xl lg:text-7xl'
				ref={headingReference}
			>
				Build your own Discord community with Vanguard
			</h1>
		</section>
	);
}
