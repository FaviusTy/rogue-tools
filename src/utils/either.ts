type Test<V> = (value: V) => boolean;

export default function either<T>(value: T, test: Test<T> = value => !!value) {
  return function orElse<O>(other: O) {
    return test(value) ? value : other;
  };
}
