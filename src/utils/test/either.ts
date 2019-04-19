import assert from "power-assert";
import either from "../either";

test("それは与えた値が真でなかったときに別の値を返す関数を返す", () => {
  assert(either(null)("returned") === "returned");
  assert(either(true)("notReturned"));
});

test("それは第２引数に与えた関数の戻り値で真偽を判定できる", () => {
  const checker = (v: number): v is number => v >= 0;
  assert(either(-1, checker)("returned") === "returned");
  assert(either(0, checker)("notReturned") === 0);
});
