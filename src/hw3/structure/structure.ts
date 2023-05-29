import { Scheme } from "../../hw2/scheme-encoder/types";
import { StructureItem } from "./types";

export class Structure {
  private scheme: StructureItem[];

  private buffer: Uint16Array;

  constructor(scheme: StructureItem[]) {
    this.scheme = scheme;
    this.buffer = new Uint16Array(this.getLength());
    this.setOffsets();
  }

  private setOffsets() {
    let offset = 0;
    this.scheme.forEach((item) => {
      item.offset = offset;
      item.maxLength = item.maxLength || 1;
      offset += item.maxLength;
    });
  }

  private getLength() {
    return this.scheme.reduce((acc, el) => acc + (el.maxLength || 1), 0);
  }

  private getSchemeItem(key: string) {
    const curitemId = this.scheme.findIndex((el) => el.name === key);
    if (curitemId === -1) {
      throw new Error("Key is no available");
    }
    return this.scheme[curitemId];
  }

  private convertData(value: number, type: string) {
    switch (type) {
      case "utf16": {
        return String.fromCharCode(value);
      }
      case "u16": {
        return Number(value);
      }
      case "boolean": {
        return Boolean(value);
      }
      default: {
        throw new Error("Wrong type");
      }
    }
  }

  set(key: string, value: any) {
    const curItem = this.getSchemeItem(key);
    if (curItem.maxLength && curItem.maxLength > 1) {
      for (let i = 0; i < value.length; i++) {
        const offset = curItem.offset! + i;
        this.buffer[offset] = (value as string).charAt(i).charCodeAt(0);
      }
    } else {
      this.buffer[curItem.offset!] = value;
    }
  }

  get(key: string) {
    const curItem = this.getSchemeItem(key);
    let result: any = "";
    if (curItem.maxLength && curItem.maxLength > 1) {
      for (let i = 0; i < curItem.maxLength; i++) {
        const offset = curItem.offset! + i;
        result += this.convertData(this.buffer[offset], curItem.type);
      }
    } else {
      result = this.convertData(this.buffer[curItem.offset!], curItem.type);
    }

    return result;
  }
}

const jackBlack = new Structure([
  { name: "name", type: "utf16", maxLength: 10 },
  { name: "lastName", type: "utf16", maxLength: 10 },
  { name: "age", type: "u16" },
]);

jackBlack.set("name", "Jack");
jackBlack.set("lastName", "Black");
jackBlack.set("age", 53);

console.log(jackBlack.get("name")); // 'Jack'
console.log(jackBlack.get("age"));
console.log(jackBlack.get("lastName"));
