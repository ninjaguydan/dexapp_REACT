// @type {import("prettier").Config}
const config = {
	plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
	printWidth: 100,
	tabWidth: 4,
	useTabs: true,
	semi: false,
	singleQuote: true,
	quoteProps: 'as-needed',
	jsxSingleQuote: false,
	trailingComma: 'all',
	bracketSpacing: true,
	jsxBracketSameLine: false,
	arrowParens: 'avoid',
	requirePragma: false,
	insertPragma: false,
	proseWrap: 'preserve',
	htmlWhitespaceSensitivity: 'css',
	endOfLine: 'lf',
	importOrder: ['^(react*|next*)', '^components/(.*)$', '<THIRD_PARTY_MODULES>', '^[./]'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	'prettier.bracketSameLine': true,
}

module.exports = config
