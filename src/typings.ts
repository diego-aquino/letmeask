export type Action<T extends string, P = void> = P extends void
  ? { type: T }
  : { type: T } & P;
