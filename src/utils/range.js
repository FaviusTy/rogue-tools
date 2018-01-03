export default function range(length, start) {
  return Array.from(new Array(length), (_, index) => (start ? start + index : index))
}
