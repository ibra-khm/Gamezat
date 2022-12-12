/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				darkGray: "#303841",
				lightGray: "#3A4750",
				amber: "#D72323",
				cream: "#EEEEEE",
				grass: "#30A62E",
				lemon: "#EBBD1C",
				indigo: "#7616F0",
			},
		},
	},
	plugins: [require("flowbite/plugin")],
	variants: {
		scrollbar: ["rounded"],
	},
});
