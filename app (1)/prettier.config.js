module.exports = {
	plugins: [require("prettier-plugin-tailwindcss")],
	printWidth: 100,
	singleQuote: false,
	tabWidth: 4,
	useTabs: true,
	trailingComma: "none",
	arrowParens: "avoid",
	endOfLine: "auto",
	jsxSingleQuote: true,
	tailwindConfig: "./tailwind.config.js"
};
