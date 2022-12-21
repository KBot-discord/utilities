import { brotliCompressSync } from 'node:zlib';
import { serialize } from 'binarytf';

export function buildCustomId<T = unknown>(identifier: string, data: T): string {
	return `${identifier};${brotliCompressSync(serialize(data)).toString('binary')}`;
}
