import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#0066FF',
				secondary: '#0A2540',
				accent: '#4F9DFF'
			},
			fontFamily: {
				sans: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
			}
		}
	},
	plugins: []
} satisfies Config;
