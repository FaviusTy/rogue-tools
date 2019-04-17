import exsits from "./exsits";
type Test<V> = (value?: V) => value is NonNullable<V>;

export default function either<T>(value: T, test: Test<T> = exsits) {
  return function orElse<O>(other: O) {
    return test(value) ? value : other;
  };
}
