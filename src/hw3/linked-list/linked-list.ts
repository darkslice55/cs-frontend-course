import { LinkedListItem } from "./types";

export class LinkedList<T> {
  first: LinkedListItem | null;

  last: LinkedListItem | null;

  constructor() {
    this.first = null;
    this.last = null;
  }

  get isEmpty() {
    return this.first === null;
  }

  add(value: T) {
    const newEl: LinkedListItem = {
      value,
      next: null,
      previous: null,
    };

    if (this.isEmpty) {
      this.first = newEl;
      this.last = newEl;
    } else {
      this.last!.next! = newEl;
      newEl.previous = this.last;
    }

    this.last = newEl;
  }

  *[Symbol.iterator]() {
    if (!this.isEmpty) {
      yield this.first?.value;
      let cursor = this.first?.next;
      while (cursor !== null) {
        yield cursor?.value;
        cursor = cursor?.next;
      }
    }
  }
}

const list = new LinkedList<number>();

list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);
list.add(6);

for (const value of list) {
  console.log(value);
}
