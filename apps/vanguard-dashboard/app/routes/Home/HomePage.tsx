import { PageLayout } from '#layouts/PageLayout.tsx';
import { Hero } from './components/Hero.tsx';

export default function () {
	return (
		<PageLayout>
			<main className='px-6'>
				<section className='grid place-items-center bg-[url("/Background.svg")] bg-center bg-cover bg-no-repeat py-20'>
					<Hero />
				</section>
			</main>
		</PageLayout>
	);
}
