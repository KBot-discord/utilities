import { describe, test, expect } from 'vitest';
import { buildCustomId, parseCustomId } from '../../../src';
import { mockIdentifier, mockData, MockCustomId } from '../../mock/MockCustomId';

describe('CustomId', () => {
	const mockCustomId = buildCustomId<MockCustomId>(mockIdentifier, mockData);

	test('GIVEN prefix and data -> RETURN CustomId', () => {
		expect(mockCustomId.startsWith(mockIdentifier)).toBe(true);
		expect(typeof mockCustomId).toBeTypeOf('string');
	});

	test('GIVEN CustomId -> RETURN prefix and data', () => {
		const parsedCustomId = parseCustomId<MockCustomId>(mockCustomId);

		expect(parsedCustomId).toStrictEqual({ identifier: mockIdentifier, data: mockData });
		expect(typeof parsedCustomId.identifier).toBeTypeOf('string');
		expect(typeof parsedCustomId.data).toBeTypeOf('string');
	});
});
