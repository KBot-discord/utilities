import { describe, test, expect } from 'vitest';
import { buildCustomId, parseCustomId } from '../../../src';
import { mockPrefix, mockData, MockCustomId } from '../../mock/MockCustomId';

describe('CustomId', () => {
	const mockCustomId = buildCustomId<MockCustomId>(mockPrefix, mockData);

	test('GIVEN prefix and data -> RETURN CustomId', () => {
		expect(mockCustomId.startsWith(mockPrefix)).toBe(true);
		expect(typeof mockCustomId).toBeTypeOf('string');
	});

	test('GIVEN CustomId -> RETURN prefix and data', () => {
		const parsedCustomId = parseCustomId<MockCustomId>(mockCustomId);

		expect(parsedCustomId).toStrictEqual({ prefix: mockPrefix, data: mockData });
		expect(typeof parsedCustomId.prefix).toBeTypeOf('string');
		expect(typeof parsedCustomId.data).toBeTypeOf('string');
	});
});
