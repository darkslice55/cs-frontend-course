import {
  ElementType,
  NormalizedScheme,
  OffsetsNormalizedScheme,
  Scheme,
} from "./types";

export class SchemeEncoder {
  private static normalize(schema: Scheme[]): NormalizedScheme[] {
    const normalizedScheme: NormalizedScheme[] = [];
    for (const [length, type] of schema) {
      if (length <= 8) {
        normalizedScheme.push({
          length,
          type,
          partial: false,
        });
      } else {
        let curLength = length;
        while (curLength > 0) {
          if (curLength > 8) {
            normalizedScheme.push({
              length: 8,
              type,
              partial: true,
            });
            curLength -= 8;
          } else {
            normalizedScheme.push({
              length: curLength,
              type,
              partial: false,
            });
            curLength = 0;
          }
        }
      }
    }

    return normalizedScheme;
  }

  private static getOffsets(
    schema: NormalizedScheme[]
  ): OffsetsNormalizedScheme[] {
    const offsetScheme: OffsetsNormalizedScheme[] = [];
    for (let i = 0, index = 0; i < schema.length; index++) {
      let offset = 0;
      while (offset + schema[i].length <= 8) {
        offsetScheme.push({
          ...schema[i],
          offset,
          index,
        });
        offset += schema[i].length;
        i++;

        if (i === schema.length) {
          break;
        }
      }
    }

    return offsetScheme;
  }

  private static createMask(size: number, offset = 0) {
    return ((2 ** 32 - 1) >>> (32 - size)) << offset;
  }

  static encode(data: Array<any>, schema: Scheme[]) {
    const normalizedScheme = this.normalize(schema);
    const offsetScheme = this.getOffsets(normalizedScheme);

    const arr = new Uint8Array(
      Math.max(...offsetScheme.map((item) => item.index)) + 1
    );

    function* dataItereator() {
      for (const el of data as Array<any>) {
        if (typeof el === "string") {
          yield* el;
        } else {
          yield el;
        }
      }
    }

    const dataIter = dataItereator();

    offsetScheme.forEach(({ length, type, index, offset }) => {
      const { value, done } = dataIter.next();

      if (done) {
        throw new Error("schema mismatch");
      }

      const bytes: number =
        type === ElementType.ASCII ? (value as string).charCodeAt(0) : value;

      arr[index] |= (bytes & this.createMask(length)) << offset;
    });

    return arr.buffer;
  }

  static decode(data: ArrayBuffer, schema: Scheme[]) {
    const normalizedScheme = this.normalize(schema);
    const offsetScheme = this.getOffsets(normalizedScheme);
    const result: (string | number | boolean)[] = [];

    const arr = new Uint8Array(data);
    let curPartial = false;
    let curId = 0;

    offsetScheme.forEach(({ length, type, index, offset, partial }, id) => {
      const bytes: number =
        (arr[index] & (this.createMask(length) << offset)) >>> offset;

      switch (type) {
        case ElementType.BOOLEAN: {
          result.push(Boolean(bytes));
          break;
        }
        case ElementType.NUMBER: {
          result.push(Number(bytes));
          break;
        }
        case ElementType.ASCII: {
          if (curPartial) {
            result[curId] += String.fromCharCode(bytes);
          } else {
            result.push(String.fromCharCode(bytes));
          }
          curPartial = partial;
          curId = id;
          break;
        }
        default:
          break;
      }
    });

    return result;
  }
}

const schema: Scheme[] = [
  [3, ElementType.NUMBER],
  [2, ElementType.NUMBER],
  [1, ElementType.BOOLEAN],
  [1, ElementType.BOOLEAN],
  [16, ElementType.ASCII],
];

const data = SchemeEncoder.encode([2, 3, true, false, "ab"], schema);

console.log(data);
console.log(SchemeEncoder.decode(data, schema));
