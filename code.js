//  Roman to Integer

const romanToInt = function (s) {
  let value = 0;
  const romanSymbolsValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
    IV: 4,
    IX: 9,
    XL: 40,
    XC: 90,
    CD: 400,
    CM: 900,
  };
  const splitSymbols = s.split("");
  splitSymbols.forEach((s, i) => {
    if (romanSymbolsValues.hasOwnProperty(s + splitSymbols[i + 1])) {
      value += romanSymbolsValues[s + splitSymbols[i + 1]];
      splitSymbols.splice(i, 1);
    } else {
      value += romanSymbolsValues[s];
    }
  });
  return value;
};

romanToInt("MCMXCIV"); //Output: 1994

//-----------------------

class ListedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  append(value) {
    const node = { value: value, next: null };
    if (!this.head) this.head = node;
    if (this.tail) this.tail.next = node;
    this.tail = node;
  }

  prepend(value) {
    const node = { value: value, next: this.head };
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
  }

  toArray() {
    const nodesListArray = [];
    let curNode = this.head;

    while (curNode) {
      nodesListArray.push(curNode);
      curNode = curNode.next;
    }

    return nodesListArray;
  }

  delete(value) {
    if (!this.head) return;
    let curNode = this.head;
    while (curNode) {
      if (curNode.next?.value === value) {
        curNode.next = curNode.next.next;
      } else {
        curNode = curNode.next;
      }
    }

    while (this.head?.value === value) {
      this.head = this.head.next;
    }
  }
}

const test = new ListedList();
test.prepend(0);
test.append(1);
test.append(2);
test.append(3);
test.append(4);
test.delete(0);

///

// Longest Substring Without Repeating Characters

const lengthOfLongestSubstring = (string) => {
  let max = 0,
    pos,
    char,
    currentStr = "";
  for (let i = 0; i < string.length; i++) {
    char = string[i];
    pos = currentStr.indexOf(char);
    if (pos != -1) currentStr = currentStr.substring(pos + 1);
    currentStr += char;
    max = Math.max(max, currentStr.length);
  }
  return max;
};

// -----------

const longestCommonPrefix = function (strs) {
  let preCommon = "";
  const minStr = strs.reduce((cur, acc) =>
    cur.length > acc.length ? acc : cur
  );

  for (let i = 0; i < minStr.length; i++) {
    let line = "";
    for (let e = 0; e < strs.length; e++) {
      line += strs[e][i];
    }

    if ([...new Set(line.split(""))].length === 1) {
      preCommon = preCommon + [...new Set(line.split(""))].join("");
    } else {
      return preCommon;
    }
  }

  return preCommon;
};

// -----

const isPalindrome = function (x) {
  const strNum = x.toString();
  const strNumReversed = strNum.split("").reverse().join("");

  return strNum === strNumReversed;
};

// -----
// Given a sorted array of distinct integers and a target value, return the index if the target is found.
// If not, return the index where it would be if it were inserted in order.
// You must write an algorithm with O(log n) runtime complexity.
const searchInsert = function (arr, target) {
  if (arr.includes(target)) return arr.indexOf(target);
  if (arr[arr.length - 1] < target) return arr.length;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= target) return i;
  }
};
// [1,3,5,6]
console.log(searchInsert([1, 3, 5, 6], 3));
