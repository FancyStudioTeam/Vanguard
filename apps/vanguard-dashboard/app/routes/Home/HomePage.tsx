import { PageLayout } from '#layouts/PageLayout.tsx';
import { LandingAboutVanguard } from './components/LandingAboutVanguard.tsx';
import { LandingHeroSection } from './components/LandingHeroSection.tsx';

export default function () {
	return (
		<PageLayout>
			<main>
				<LandingHeroSection />
				<LandingAboutVanguard />
			</main>
		</PageLayout>
	);
}
