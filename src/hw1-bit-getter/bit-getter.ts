export class BitGetter {
  private arr: Uint8Array;

  constructor(arr: Uint8Array) {
    this.arr = arr;
  }

  private setBit(el: number, bitId: number) {
    return el | (1 << bitId);
  }

  private resetBit(el: number, bitId: number) {
    return el & ~(1 << bitId);
  }

  private validateData(elId: number, bitId: number) {
    if (elId >= this.arr.length || elId < 0) {
      throw new Error("ElId is out of array range");
    }
    if (bitId > 7 || bitId < 0) {
      throw new Error("BitId must be between 0 and 7");
    }
  }

  get(elId: number, bitId: number) {
    this.validateData(elId, bitId);
    return (this.arr[elId] & (1 << bitId)) >> bitId;
  }

  set(elId: number, bitId: number, value: 0 | 1) {
    this.validateData(elId, bitId);
    if (value === 1) {
      this.arr[elId] = this.setBit(this.arr[elId], bitId);
    } else {
      this.arr[elId] = this.resetBit(this.arr[elId], bitId);
    }
  }
}
