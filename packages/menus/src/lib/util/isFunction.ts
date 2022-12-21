export function isFunction<A extends readonly any[], R>(cb: (...args: A) => R): true;
export function isFunction(input: any): input is (...args: readonly any[]) => any;
export function isFunction(input: any) {
	return typeof input === 'function';
}
