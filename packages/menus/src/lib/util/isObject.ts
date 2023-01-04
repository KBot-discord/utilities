export type Constructor<T> = new (...args: any[]) => T;

// eslint-disable-next-line @typescript-eslint/ban-types
export type NonNullObject = {} & object;

export function isObject(input: unknown, constructorType?: ObjectConstructor): input is NonNullObject {
	return typeof input === 'object' && input ? input.constructor === (constructorType ?? Object) : false;
}
