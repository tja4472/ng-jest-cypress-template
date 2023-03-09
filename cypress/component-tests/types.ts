/**
 * @example
 * ```typescript
 * type EventEmitters = 'cancel' | 'checkout' | 'remove';
 *
 * const spyAliases: SpyAliases<EventEmitters> = {
 *   cancel: 'cancelSpy',
 *   checkout: 'checkoutSpy',
 *   remove: 'removeSpy',
 * } as const;
 * ```
 */
export type SpyAliases<T extends string> = {
  [K in T]: `${K}Spy`;
};

/**
 * @example
 * ```typescript
 * type EventEmitters = 'cancel' | 'checkout' | 'remove';
 *
 * const spyIds: SpyIds<EventEmitters> = {
 *   cancel: '@cancelSpy',
 *   checkout: '@checkoutSpy',
 *   remove: '@removeSpy',
 * } as const;
 * ```
 */
export type SpyIds<T extends string> = {
  [K in T]: `@${K}Spy`;
};

/**
 * @example
 * ```typescript
 * type DataTestIdNames = 'clearButton' | 'searchInput';
 *
 * const dataTestIds: DataTestIds<DataTestIdNames> = {
 *   clearButton: 'clearButton',
 *   searchInput: 'searchInput',
 * } as const;
 * ```
 */
export type DataTestIds<T extends string> = {
  [K in T]: K;
};
