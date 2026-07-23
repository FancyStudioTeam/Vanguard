<template>
	<main uno-grid uno-h-dvh uno-place-content-center>
		<section uno-flex="~ col" uno-gap-4>
			<h1 id="not-found-text" uno-font-bold uno-text-5xl>404 - Not Found</h1>
			<RouterLink uno-button="~ filled size-default" :to="{ name: 'Home' }">
				Return to Home Page
			</RouterLink>
		</section>
	</main>
</template>
