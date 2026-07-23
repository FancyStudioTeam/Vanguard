<script
	lang="ts"
	setup
	vapor
>
	import { Primitive, type PrimitiveProps } from 'reka-ui';
	import type { HTMLAttributes } from 'vue';

	import { type ButtonVariantProps, ButtonVariants } from './ButtonComponent';
	import { classNames } from './utils/classNames';

	interface Props extends /* @vue-ignore */ PrimitiveProps {
		class?: HTMLAttributes['class'];
		size?: ButtonVariantProps['size'];
		variant?: ButtonVariantProps['variant'];
	}

	const props = withDefaults(defineProps<Props>(), {
		size: 'default',
		variant: 'primary',
	});
</script>

<template>
	<Primitive
		as="button"
		:class="classNames(ButtonVariants({ size, variant }), props.class)"
	>
		<slot />
	</Primitive>
</template>
