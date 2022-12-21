import { brotliCompressSync, brotliDecompressSync } from 'node:zlib';
import { deserialize, serialize } from 'binarytf';
import type { CustomId } from '../types';

export function buildKey<T>(prefix: string, params: T): CustomId {
	return `${prefix};${brotliCompressSync(serialize<T>(params)).toString('binary')}` as CustomId;
}

export function parseKey<T>(id: CustomId) {
	const { 1: data } = id.split(';');
	return deserialize<T>(brotliDecompressSync(Buffer.from(data, 'binary')));
}
