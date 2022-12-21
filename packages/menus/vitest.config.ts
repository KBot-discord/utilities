import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		include: ['./tests/**/*.test.ts'],
		root: './',
		// reporters: ['default', 'junit'],
		// outputFile: './coverage/junit.xml',
		coverage: {
			provider: 'istanbul'
		}
	}
});
