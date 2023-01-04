export function isFunction(input: any): input is (...args: readonly any[]) => any {
	return typeof input === 'function';
}
