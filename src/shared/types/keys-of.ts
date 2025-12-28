export const keysOf =
  <T>() =>
  <K extends readonly (keyof T)[]>(...keys: K) =>
    keys;
