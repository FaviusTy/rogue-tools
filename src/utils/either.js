// @flow

type Test = (target: any) => boolean

export default function either(target: any, test: Test = target => target) {
  return (orElse: any) => (test(target) ? target : orElse)
}
