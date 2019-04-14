import assert from "power-assert";
import lerp from "../lerp";

test("t = 0 の時、始点の値を返す", () => {
  assert(lerp(0, 1) === 0);
  assert(lerp(0, 100) === 0);
  assert(lerp(3, 5) === 3);
  assert(lerp(5, 3) === 5);
});

test("t = 1の時、終点の値を返す", () => {
  assert(lerp(0, 1, 1) === 1);
  assert(lerp(0, 100, 1) === 100);
  assert(lerp(3, 5, 1) === 5);
  assert(lerp(5, 3, 1) === 3);
});

test("t の値に応じて適切な補完値を返す", () => {
  assert(lerp(0, 1, 0.4) === 0.4);
  assert(lerp(0, 100, 0.6) === 60);
  assert(lerp(3, 5, 0.5) === 4);
  assert(lerp(5, 3, 0.3) === 4.4);
});
