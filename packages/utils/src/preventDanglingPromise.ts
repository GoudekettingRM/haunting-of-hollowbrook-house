export function preventDanglingPromise<T extends unknown[]>(
  fn: (...args: T) => Promise<unknown>,
): (...args: T) => void {
  return (...args) => {
    void fn(...args);
  };
}
