/**
 * Types shared across several features only.
 * A type used by a single feature belongs in src/features/<feature>/types.ts
 */
export type ApiList<T> = {
  items: T[];
  total: number;
};
