export default function exists<T>(value?: T | null): value is T {
  return value !== undefined && value !== null;
}
