import { brotliDecompressSync } from 'node:zlib';
import { deserialize } from 'binarytf';

export function parseCustomId<T>(CustomId: string): { prefix: string; data: T } {
	const { 0: prefix, 1: data } = CustomId.split(';');
	return { prefix, data: deserialize<T>(brotliDecompressSync(Buffer.from(data, 'binary'))) };
}
