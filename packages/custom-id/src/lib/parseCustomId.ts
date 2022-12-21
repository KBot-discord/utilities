import { brotliDecompressSync } from 'node:zlib';
import { deserialize } from 'binarytf';

export function parseCustomId<T>(CustomId: string): { identifier: string; data: T } {
	const { 0: identifier, 1: data } = CustomId.split(';');
	return { identifier, data: deserialize<T>(brotliDecompressSync(Buffer.from(data, 'binary'))) };
}
