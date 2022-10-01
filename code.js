// Hey 👋🏻

// -1 Roman to Integer

// Example:
// Input: s = "LVIII"
// Output: 58
// Explanation: L = 50, V= 5, III = 3.
// I can be placed before V (5) and X (10) to make 4 and 9.
// X can be placed before L (50) and C (100) to make 40 and 90.
// C can be placed before D (500) and M (1000) to make 400 and 900.

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

// -2 Add Two Numbers
// You are given two non-empty linked lists representing two non-negative integers.
// The digits are stored in reverse order, and each of their nodes contains a single digit.
// Add the two numbers and return the sum as a linked list.
// You may assume the two numbers do not contain any leading zero, except the number 0 itself.
// Example : Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function (l1, l2) {};

// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// You can return the answer in any order.

const twoSum = function (nums, target) {
  const better = (nums, target, memo) => {
    for (let index = 0; index < nums.length; index++) {
      for (let i = 0; i < nums.length; i++) {
        let comparingIndex = index === i ? ++i : i;
        memo;
        if (nums[index] + nums[comparingIndex] === target) {
          console.log(memo);
          return [index, comparingIndex];
        }
      }
    }
  };
  return better(nums, target, {});
};

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
// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
function lengthOfLongestSubstring(string) {
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
}
console.log(lengthOfLongestSubstring("abcefjddvddfd"));
