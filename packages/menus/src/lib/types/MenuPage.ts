import type { PaginatedMessageMessageOptionsUnion } from '@sapphire/discord.js-utilities';
import type { MenuPageBuilder } from '../structures/MenuPageBuilder';
import type { MenuPagesBuilder } from '../structures/MenuPagesBuilder';

export type MenuPage = PaginatedMessageMessageOptionsUnion;

export type MenuPageResolvable = MenuPageBuilder | MenuPage;

export type MenuPagesResolvable = MenuPageResolvable[] | MenuPageBuilder[] | MenuPage[] | MenuPagesBuilder;
