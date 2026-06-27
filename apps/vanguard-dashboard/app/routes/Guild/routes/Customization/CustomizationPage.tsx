import './CustomizationPage.css';

import { PreviewMemberList } from './components/Preview/PreviewMemberList.tsx';

export default function () {
	return (
		<>
			<section className='flex flex-col'>
				<h1 className='font-bold text-3xl'>Bot Customization</h1>
				<p className='font-semibold text-neutral-400 text-sm'>
					Give Vanguard a more customized look for your Discord community.
				</p>
			</section>
			<section className='rounded-3xl bg-neutral-900 p-6'>
				<PreviewMemberList />
			</section>
		</>
	);
}
