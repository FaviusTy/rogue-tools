export default function either(target, test = target => target) {
  return orElse => (test(target) ? target : orElse)
}
