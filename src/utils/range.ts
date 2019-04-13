export default function range(length: number, start: number) {
  return Array.from(new Array(length), (_, index) =>
    start ? start + index : index
  );
}
