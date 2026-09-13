/**
 * type ที่ใช้ร่วมกันหลาย feature เท่านั้น
 * ถ้า type ใช้แค่ feature เดียว ให้เก็บไว้ที่ src/features/<feature>/types.ts
 */
export type ApiList<T> = {
  items: T[];
  total: number;
};
