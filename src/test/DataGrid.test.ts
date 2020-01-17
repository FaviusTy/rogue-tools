import assert from "power-assert";
import { stripIndents } from "common-tags";
import range from "@favi_ty/range";
import Point from "../Point";
import DataGrid from "../DataGrid";

test("それは width と height の値から生成される", () => {
  const map = new DataGrid(80, 60);
  assert(map instanceof DataGrid);
});

test("それは width と height を参照できる", () => {
  const map = new DataGrid(60, 40);
  assert(map.width === 60);
  assert(map.height === 40);
});

test("それは row によって生成された空間を配列として返す", () => {
  const map = new DataGrid(5, 5);
  assert(map.raw.length === 5 * 5);
});

test("toString", () => {
  const map = new DataGrid(5, 5);
  const result = stripIndents`
  1 0 0 0 1
  0 0 0 0 0
  0 0 0 0 0
  0 0 0 0 0
  1 0 0 0 1
  `;
  map.fill(0);
  map.put(new Point(0, 0), 1);
  map.put(new Point(4, 0), 1);
  map.put(new Point(0, 4), 1);
  map.put(new Point(4, 4), 1);
  assert(`${map}` === result);
});

test("それが row によって返す配列は非破壊的である", () => {
  const map = new DataGrid<boolean>(2, 2);
  const raw = map.raw;
  raw[2] = true;
  assert(raw[2] !== map.raw[2]);
});

test("それが生成する空間配列の各要素の初期値はundefinedである", () => {
  const map = new DataGrid(5, 5);
  map.raw.forEach(v => v === undefined);
});

test("それは put によって指定した座標に対応する要素を保持する", () => {
  const map = new DataGrid<boolean>(5, 5);
  map.put(new Point(3, 3), true);
  assert(map.raw[18]);
});

test("それは pick によって与えられたPointに格納されている値を返す", () => {
  const map = new DataGrid(5, 5);
  const point = new Point(1, 2);
  map.put(point, true);
  assert(map.pick(point));
});

test("それは pick に与えたPointが空間の範囲外だった時にundefinedを返す", () => {
  const map = new DataGrid(5, 5);
  map.fill(true);
  const overX = new Point(5, 0);
  const overY = new Point(1, 5);
  const overRange = new Point(5, 5);
  assert(map.pick(overX) === undefined);
  assert(map.pick(overY) === undefined);
  assert(map.pick(overRange) === undefined);
});

test("それは fill によって引数の値をすべての空間要素に設定する", () => {
  const map = new DataGrid(5, 5);
  map.fill(".");
  map.raw.forEach(v => assert(v === "."));
});

test("それは paste に与えたMapインスタンスをPointを原点として自身の空間に上書きする", () => {
  const target = new DataGrid(5, 5);
  const pasteMap = new DataGrid(2, 2);
  pasteMap.fill(true);
  target.paste(new Point(1, 1), pasteMap);
  range(2, 1).forEach(x => {
    range(2, 1).forEach(y => {
      assert(target.pick(new Point(x, y)));
    });
  });
});

test("それは clip によって指定した範囲の空間を新しいMapインスタンスとして返す", () => {
  const target = new DataGrid<number>(5, 5);
  let count = 0;
  range(2, 2).forEach(y => {
    range(3, 1).forEach(x => {
      target.put(new Point(x, y), count);
      count++;
    });
  });
  const clipedMap = target.clip(new Point(1, 2), { width: 3, height: 2 });
  if (!clipedMap) return fail("clipedMap undefined");
  clipedMap.raw.forEach((element, index) => assert(element === index));
});

test("それは pickOut によって指定した Point の値を取り出す", () => {
  const element = "*" as const;
  const target = new DataGrid<typeof element>(5, 5);
  target.fill(element);
  const pickOutPoint = new Point(3, 1);
  const result = target.pickOut(pickOutPoint);
  assert(result === "*");
  assert(!target.pick(pickOutPoint));
});

//TODO isOverrange!
