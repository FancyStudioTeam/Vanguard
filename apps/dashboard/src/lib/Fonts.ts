import LocalFont from 'next/font/local';

export const GeneralSansFont = LocalFont({
	src: '../../public/fonts/GeneralSans.woff2',
	variable: '--font-general-sans',
});

export const { variable: GeneralSansVariable } = GeneralSansFont;
