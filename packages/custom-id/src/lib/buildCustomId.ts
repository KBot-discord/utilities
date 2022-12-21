import { brotliCompressSync } from 'node:zlib';
import { serialize } from 'binarytf';
import type { CustomId } from '../types/CustomId';

export function buildCustomId<T>(prefix: string, data: T): CustomId {
	return `${prefix};${brotliCompressSync(serialize<T>(data)).toString('binary')}` as CustomId;
}
