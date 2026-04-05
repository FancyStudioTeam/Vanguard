import { Sidebar } from '#components/dashboard/sidebar/Sidebar.tsx';

export default async function ({
	params,
}: {
	params: Promise<{
		guildId: string;
	}>;
}) {
	const { guildId } = await params;

	return (
		<div className='h-dvh w-full'>
			<Sidebar guildId={guildId} />
			<main className='lg:ml-100'>
				<h1>Hola</h1>
			</main>
		</div>
	);
}
