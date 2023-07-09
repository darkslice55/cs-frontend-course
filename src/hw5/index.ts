export const collapse = (obj: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};

  function collapseInner(objct: Record<string, any>, key?: string) {
    for (const prop of Object.keys(objct)) {
      const value = objct[prop];
      if (typeof value === "object") {
        collapseInner(value, key?.concat(".", prop) || prop);
      } else {
        result[key?.concat(".", prop) || prop] = value;
      }
    }
  }

  collapseInner(obj);

  return result;
};

export const collapseStack = (
  obj: Record<string, any>
): Record<string, any> => {
  const result: Record<string, any> = {};
  const stack: Array<[string | null, any]> = [[null, obj]];

  while (stack.length) {
    const [key, curEl] = stack.pop()!;

    for (const prop of Object.keys(curEl)) {
      const value = curEl[prop];
      if (typeof value === "object") {
        stack.push([key?.concat(".", prop) || prop, value]);
      } else {
        result[key?.concat(".", prop) || prop] = value;
      }
    }
  }

  return result;
};

// const obj = {
//   a: {
//     b: [1, 2],
//     "": { c: 2 },
//   },
// };

// console.log(collapse(obj));
// console.log(collapseStack(obj));

export const isValid = (text: string): boolean => {
  const bracers = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  const stack: string[] = [];

  for (const char of text) {
    if (Object.values(bracers).includes(char)) stack.push(char);
    if (
      Object.keys(bracers).includes(char) &&
      stack.pop() !== bracers[char as keyof typeof bracers]
    )
      return false;
  }

  return true;
};

// console.log(isValid("(hello{world} and [me])")); // true
// console.log(isValid("(hello{world)} and [me])")); // false
// console.log(isValid(")")); // false
