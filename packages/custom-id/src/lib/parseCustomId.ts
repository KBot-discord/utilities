import { brotliDecompressSync } from 'node:zlib';
import { deserialize } from 'binarytf';
import type { CustomId } from '../types/CustomId';

export function parseCustomId<T>(id: CustomId): { prefix: string; data: T } {
	const { 0: prefix, 1: data } = id.split(';');
	return { prefix, data: deserialize<T>(brotliDecompressSync(Buffer.from(data, 'binary'))) };
}
