import './CustomizationPage.css';

import { PreviewMemberList } from './components/Preview/PreviewMemberList.tsx';

export default function () {
	return (
		<>
			<h1 className='font-bold text-3xl'>Bot Customization</h1>
			<section className='rounded-3xl bg-neutral-900 p-6'>
				<PreviewMemberList />
			</section>
		</>
	);
}
