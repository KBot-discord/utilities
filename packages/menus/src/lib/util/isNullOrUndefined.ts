export function isNullOrUndefined(value: unknown): value is null | undefined {
	return value === undefined || value === null;
}
