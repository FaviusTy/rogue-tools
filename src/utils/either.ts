type Test<T> = (value: T) => boolean;

export default function either<T>(value: T, test: Test<T> = value => !!value) {
  return function orElse<T>(other: T) {
    return test(value) ? value : other;
  };
}
