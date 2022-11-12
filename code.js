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

const searchInsert = function (arr, target) {
  if (arr.includes(target)) return arr.indexOf(target);
  if (arr[arr.length - 1] < target) return arr.length;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= target) return i;
  }
};

// ------

// Alice has n balloons arranged on a rope. You are given a 0-indexed string
//  colors where colors[i] is the color of the ith balloon.
// Alice wants the rope to be colorful. She does not want two consecutive balloons to be of the same color,
// so she asks Bob for help. Bob can remove some balloons from the rope to make it colorful.
// You are given a 0-indexed integer array neededTime where neededTime[i] is the time (in seconds) that
// Bob needs to remove the ith balloon from the rope.
// Return the minimum time Bob needs to make the rope colorful.

const minCost = function (colors, neededTime) {
  let time = 0;

  for (let i = 0; i < colors.length; i++) {
    if (colors[i] == colors[i + 1]) {
      time +=
        neededTime[i] > neededTime[i + 1] ? neededTime[i + 1] : neededTime[i];
      let index = neededTime[i] > neededTime[i + 1] ? i + 1 : i;
      neededTime[index] = neededTime[i];
    }
  }

  return time;
};

// minCost("aaabbbabbbb", [3, 5, 10, 7, 5, 3, 5, 5, 4, 8, 1]) // result 26

const isValid = function (s) {
  const stringArr = s.split("");
  const stack = [];
  const parentheses = [
    {
      char: "(",
      close: ")",
    },
    {
      char: "{",
      close: "}",
    },
    {
      char: "[",
      close: "]",
    },
  ];

  for (let i = 0; i < stringArr.length; i++) {
    const openChar = parentheses.find((obj) => obj.char === stringArr[i]);
    if (openChar) {
      stack.push(openChar.char);
    } else {
      const match = `${stack[stack.length - 1]}${stringArr[i]}`;
      if (match === "[]" || match === "{}" || match === "()") {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length <= 0 ? true : false;
};

let test1 = "{[({})]}{()}[]{}"; // true

isValid(test1);

//

const lengthOfLastWord = function (s) {
  return s.trim().split(" ").splice(-1).join("").length;
};

lengthOfLastWord("   fly me   to   the moon  ");

//

const getWinner = (listOfBallots) => {
  const results = {};

  if ([...new Set(listOfBallots)].length === 1) return listOfBallots[0];

  listOfBallots.forEach((ballot) => {
    if (results.hasOwnProperty(ballot)) {
      results[ballot] = results[ballot] + 1;
    } else {
      results[ballot] = 1;
    }
  });

  //check if all are equels
  const res = [];
  for (let key in results) {
    res.push(results[key]);
  }

  if ([...new Set(res)].length <= 1) return null;

  let max = { candidate: "", numVoters: 0 };

  for (let key in results) {
    if (results[key] > max.numVoters)
      max = { candidate: key, numVoters: results[key] };
  }

  if (listOfBallots.length / 2 >= max.numVoters) return null;

  return max.candidate;
};

// //3 votes for "A", 2 votes for "B" -> "A" wins the election
getWinner(["A"]);
