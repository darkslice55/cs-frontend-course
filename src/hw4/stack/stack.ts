export class Stack {
  #array: Int32Array;

  #top: number;

  constructor(length = 1000) {
    this.#array = new Int32Array(length);
    this.#top = -1;
  }

  get isEmpty() {
    return this.#top === -1;
  }

  get length() {
    return this.#top + 1;
  }

  push(el: number) {
    this.#array[this.length] = el;
    this.#top++;
  }

  pop() {
    const temp = this.#array[this.length - 1];
    if (this.length) this.#top--;
    return temp;
  }
}

// const stack = new Stack(10);

// console.log(stack.isEmpty);
// console.log(stack.length);
// stack.push(22);
// stack.push(15);
// console.log(stack.length);
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.pop());
