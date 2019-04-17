export default function exists<T>(value?: T | null): value is NonNullable<T> {
  return value !== undefined && value !== null;
}
