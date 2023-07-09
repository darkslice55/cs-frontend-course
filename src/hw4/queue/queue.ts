import { LinkedList } from "../../hw3/linked-list";

export class Queue<T> {
  #list: LinkedList<T>;

  constructor() {
    this.#list = new LinkedList();
  }

  get head() {
    return this.#list.first?.value;
  }

  push(el: T) {
    this.#list.add(el);
  }

  pop() {
    return this.#list.deleteFirst()?.value ?? null;
  }

  shift(el: T) {
    this.#list.addFirst(el);
  }

  unshift() {
    return this.#list.deleteLast()?.value ?? null;
  }

  toString() {
    return [...this.#list].join(", ");
  }
}

// const queue = new Queue<number>();

// queue.push(1);
// queue.push(2);
// queue.push(3);
// queue.push(4);
// queue.shift(0);
// queue.unshift();

// console.log("queue.head", queue.head);
// console.log("queue.pop", queue.pop());
// console.log("queue.head", queue.head);
// console.log(`${queue}`);
