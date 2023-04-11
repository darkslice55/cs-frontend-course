import { BitGetter } from "./";

describe("BitGetter testing", function () {
  let bitGetter: BitGetter;

  beforeEach(() => {
    bitGetter = new BitGetter(new Uint8Array([0b1110, 0b1101]));
  });
  test("Can get bit", () => {
    expect(bitGetter.get(0, 1)).toEqual(1);
    expect(bitGetter.get(1, 1)).toBe(0);
    expect(bitGetter.get(1, 2)).toBe(1);
  });
  test("Can set bit", () => {
    bitGetter.set(0, 1, 0);
    expect(bitGetter.get(0, 1)).toBe(0);
    expect(bitGetter.get(1, 1)).toBe(0);
    bitGetter.set(1, 0, 0);
    expect(bitGetter.get(1, 0)).toBe(0);
    expect(bitGetter.get(1, 2)).toBe(1);
  });
  test("Throw error when access out of range", () => {
    expect(() => bitGetter.get(3, 0)).toThrowError();
    expect(() => bitGetter.get(0, 9)).toThrowError();
  });
});
