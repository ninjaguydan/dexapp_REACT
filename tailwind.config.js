/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#f12849',
				primaryDark: '#ca0b2b',
				secondary: '#009df1',
				yellow: '#ffff00',
				yellowLight: '#fcd34d',
				green: '#008000',
				greenLight: '#2bc07b',
				purple: '#7f2fb8',
				gray1: '#151415',
				gray2: '#1c1c1f',
				gray3: '#6c757d',
				gray4: '#898989',
				gray5: '#ced4da',
				gray6: '#26262d',
				black_80: '#000000cc',
			},
			gridTemplateColumns: {},
			boxShadow: {
				focus: '4px 4px 3px black',
			},
		},
		screens: {
			xsm: '400px',
			sm: '550px',
			md: '800px',
			lg: '1080px',
			// xl: "1280px",
			// "2xl": "1536px",
		},
	},
	plugins: [],
}
