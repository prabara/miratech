import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#2563EB',
				secondary: '#0A0F1D',
				accent: '#6366F1'
			},
			fontFamily: {
				sans: ['Outfit', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
			}
		}
	},
	plugins: []
} satisfies Config;
