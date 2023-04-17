module.exports = {
	extends: ['@sapphire'],
	parserOptions: {
		project: './tsconfig.eslint.json',
		tsconfigRootDir: __dirname
	},
	rules: {
		'@typescript-eslint/require-await': 0,
		'@typescript-eslint/no-base-to-string': 0,
		'@typescript-eslint/member-ordering': 0
	}
};
