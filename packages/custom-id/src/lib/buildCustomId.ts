import { brotliCompressSync } from 'node:zlib';
import { serialize } from 'binarytf';

export function buildCustomId<T = unknown>(prefix: string, data: T): string {
	return `${prefix};${brotliCompressSync(serialize(data)).toString('binary')}`;
}
