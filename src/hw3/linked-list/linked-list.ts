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

  addFirst(value: T) {
    const newEl: LinkedListItem = {
      value,
      next: null,
      previous: null,
    };

    if (this.isEmpty) {
      this.last = newEl;
    } else {
      this.first!.previous = newEl;
    }

    newEl.next = this.first;
    this.first = newEl;
  }

  deleteFirst() {
    if (this.isEmpty) throw new Error("List is empty");
    const temp = this.first;
    if (this.first?.next === null) {
      this.last = null;
    } else {
      this.first!.next!.previous = null;
    }
    this.first = this.first?.next ?? null;
    return temp;
  }

  deleteLast() {
    if (this.isEmpty) throw new Error("List is empty");
    const temp = this.last;
    if (this.last?.previous === null) {
      this.first = null;
    } else {
      this.last!.previous!.next = null;
    }
    this.last = this.last?.previous ?? null;
    return temp;
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

// const list = new LinkedList<number>();

// list.add(1);
// list.add(2);
// list.add(3);
// list.add(4);
// list.add(5);
// list.add(6);

// for (const value of list) {
//   console.log(value);
// }
