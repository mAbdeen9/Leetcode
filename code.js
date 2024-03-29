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

class linkList {
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

const addTwoNumbers = (l1, l2) => {
  const linkedList = new linkList();
  const reversedL1 = l1.reverse().join("");
  const reversedL2 = l2.reverse().join("");
  const sum = (+reversedL1 + +reversedL2).toString().split("").reverse();

  let i = 0;
  while (sum.length > linkedList.toArray().length) {
    linkedList.append(sum[i]);
    i++;
  }

  return linkedList;
};

// console.log(addTwoNumbers([2, 4, 3], [5, 6, 4]));

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

// lengthOfLastWord("   fly me   to   the moon  ");

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

  //check if all are equals
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
// getWinner(["A"]);

//

const removeDuplicates = function (nums) {
  let index = 1;
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] !== nums[i + 1]) {
      nums[index] = nums[i + 1];
      index++;
    }
  }
  return nums;
};

// removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);

// fibonacci sequence

const fib = (index) => {
  const fibonacciArray = [1, 1];

  for (let i = 0; i < index; i++) {
    fibonacciArray.push(fibonacciArray[i] + fibonacciArray[i + 1]);
  }

  return fibonacciArray[index];
};

// fib(4)

// isPrime

const isPrime = (number) => {
  for (let i = number - 1; i > 1; i--) {
    const divide = number / i;
    if (divide === Math.floor(divide)) return false;
  }

  return true;
};

// isPrime(2312)

// const binarySearch = (sortedArray, element) => {
//   console.log("running");
//   const shallowCopy = [...sortedArray];
//   const middleIndex = Math.round(shallowCopy.length / 2);
//   if (shallowCopy[middleIndex] < element) {
//     return binarySearch(sortedArray.slice(middleIndex), element);
//   }
//   if (shallowCopy[middleIndex] > element) {
//     return binarySearch(sortedArray.slice(0, middleIndex), element);
//   }
//   console.log(middleIndex);
//   if (shallowCopy.length === 1) return shallowCopy[0];
//   return shallowCopy[middleIndex];
// };

const binarySearch = (sortedArray, element) => {
  let startIndex = 0;
  let endIndex = sortedArray.length - 1;
  while (startIndex <= endIndex) {
    let middleIndex = startIndex + Math.floor(endIndex - startIndex / 2);

    if (sortedArray[middleIndex] === element) {
      return middleIndex;
    }

    if (sortedArray[middleIndex] < element) {
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex - 1;
    }
  }

  return -1;
};

// console.log(
//   binarySearch([-7, -1, 3, 7, 32, 54, 192, 343, 554, 2043, 10234], 10234)
// );

// console.log(binarySearch([1, 2, 3, 4, 5], 2));

const sortArray = (arr) => {
  const result = [];

  while (arr.length > 0) {
    const smallest = arr.reduce((cur, acc) => (cur > acc ? acc : cur));
    result.push(smallest);
    arr.splice(arr.indexOf(smallest), 1);
  }

  return result;
};

const maxBag = (arr, max) => {
  const bag = [];
  const result = [];

  for (let e of arr) {
    if (e.w <= max) {
      bag.push({ ...e, valToWight: (e.val / e.w).toFixed(3) });
    }
  }

  const sortedBag = bag.sort((a, b) => b.valToWight - a.valToWight);
  let bagWight = 0;

  for (let j of sortedBag) {
    bagWight += j.w;
    if (bagWight <= max) {
      result.push({ id: j.id, val: j.val, w: j.w });
    } else {
      const maxValueBag = Math.max(...bag.map((e) => e.val));
      const e = bag.find((i) => i.val === maxValueBag);
      const finalVal = result.reduce((acc, cur) => acc.val + cur.val);
      return finalVal.val < maxValueBag
        ? { id: e.id, val: e.val, w: e.w }
        : result;
    }
  }

  return result;
};
BigInt;

// console.log(
//   maxBag(
//     [
//       { id: "b", val: 6, w: 8 },
//       { id: "a", val: 3, w: 3 },
//       { id: "c", val: 10, w: 3 },
//     ],
//     8
//   )
// );

//

var removeElement = function (nums, val) {
  nums = nums.filter((num) => num !== val);

  return nums.length;
};

//

const findMedianSortedArrays = function (nums1, nums2) {
  const merged = [...nums1, ...nums2].sort((a, b) => a - b);

  if (Math.ceil(merged.length / 2) !== merged.length / 2) {
    return merged[Math.floor(merged.length / 2)];
  }

  const middle =
    (merged[merged.length / 2] - merged[merged.length / 2 - 1]) / 2;

  return middle + merged[merged.length / 2 - 1];
};

// console.log(findMedianSortedArrays([1, 2], [3, 4]));

const longestPalindrome = function (s) {
  const start = Date.now();
  let result = [];

  for (let i = 0; i < s.length; i++) {
    let str = "";
    for (let j = i + 1; j < s.length; j++) {
      if (str === "") {
        str = s[i] + s[j];
      } else {
        str += s[j];
        if (result.includes(str)) continue;
      }
      let reversedStr = str.split("").reverse().join("");
      if (str === reversedStr) {
        result.push(str);
      }
    }
  }
  if (result.length < 1) {
    return s[0];
  }
  const longest = result.reduce((cur, acc) =>
    cur.length > acc.length ? cur : acc
  );

  const end = Date.now();
  console.log(end - start);
  return longest;
};

// console.log(
//   longestPalindrome(
//     "civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth"
//   )
// );

// console.log(plusOne([6, 1, 4, 5, 3, 9, 0, 1, 9, 5, 1, 8, 6, 7, 0, 5, 5, 4, 3]));

var addBinary = function (a, b) {
  let reveresA = a.split("").reverse().join("");
  let reveresB = b.split("").reverse().join("");

  let aRes = 0;
  let bRes = 0;

  for (let i = 0; i < a.length; i++) {
    aRes += Math.pow(2, i) * reveresA[i];
  }

  for (let i = 0; i < b.length; i++) {
    bRes += Math.pow(2, i) * reveresB[i];
  }

  let sumAsDecimal = aRes + bRes;

  let resultAsBinary;
  if (sumAsDecimal == 0) return "0";
  while (sumAsDecimal > 0) {
    if (sumAsDecimal / 2 === Math.ceil(sumAsDecimal / 2)) {
      if (resultAsBinary === undefined) {
        resultAsBinary = "0";
        sumAsDecimal = Math.floor(sumAsDecimal / 2);
        continue;
      }
      resultAsBinary += "0";
    } else {
      if (resultAsBinary === undefined) {
        resultAsBinary = "1";
        sumAsDecimal = Math.floor(sumAsDecimal / 2);
        continue;
      }
      resultAsBinary += "1";
    }

    sumAsDecimal = Math.floor(sumAsDecimal / 2);
  }

  return resultAsBinary.split("").reverse().join("");
};

// console.log(
//   addBinary(
//     "10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101",
//     "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011"
//   )
// );

var reverse = function (x) {
  let revNumber;
  if (x.toString().includes("-")) {
    revNumber = `-${x.toString().split("-")[1].split("").reverse().join("")}`;
  } else {
    revNumber = x.toString().split("").reverse().join("");
  }

  return revNumber > Math.pow(-2, 31) && revNumber < Math.pow(2, 31) - 1
    ? revNumber
    : 0;
};

// console.log(reverse(-123));

const singleNumber = function (nums) {
  const numbers = {};

  for (let i of nums) {
    if (!numbers.hasOwnProperty(i)) {
      numbers[i] = 0;
    } else {
      numbers[i] = numbers[i] + 1;
    }
  }

  for (let k in numbers) {
    if (numbers[k] === 0) return [k];
  }
};

// console.log(singleNumber([2, 1, 4, 2, 4]));

var isUgly = function (num) {
  if (num === 0) return false;
  var n;
  while (num !== 1) {
    n = num / 5;
    if (Math.floor(n) === n) {
      num = n;
      continue;
    }

    n = num / 3;
    if (Math.floor(n) === n) {
      num = n;
      continue;
    }

    n = num / 2;
    if (Math.floor(n) === n) {
      num = n;
      continue;
    }

    return false;
  }

  return true;
};

// Hash Table:

class HashTable {
  constructor(size) {
    this.size = size;
    this.buckets = Array(this.size)
      .fill(null)
      .map(() => []);
  }

  hash(key) {
    let hash = 0;
    for (let char of key) {
      hash += char.charCodeAt(0);
    }

    return hash % this.size;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const bucketElement = bucket.find((ele) => ele.key === key);
    if (bucketElement) {
      bucketElement.value = value;
    } else {
      bucket.push({ key: key, value: value });
    }
  }

  get(key) {
    const index = this.hash(key);
    const getItem = this.buckets[index].find((item) => item.key === key);

    return getItem;
  }
}

const table = new HashTable(10);

// table.set("name2", "Julia");
// table.set("name", "mohamed");
// table.set("name", "test");
// table.set("lastName", "abdeen");
// console.log(table.buckets);
// console.log(table.get("lastName"));

//Calculating with Functions

function zero(operation) {
  if (!operation) return 0;
  if (operation.operator === "add") return 0 + +operation.value;
  if (operation.operator === "sub") return 0 - +operation.value;
  if (operation.operator === "multi") return 0 * +operation.value;
  if (operation.operator === "division")
    return Math.floor(0 / +operation.value);
}
function one(operation) {
  if (!operation) return 1;
  if (operation.operator === "add") return 1 + +operation.value;
  if (operation.operator === "sub") return 1 - +operation.value;
  if (operation.operator === "multi") return 1 * +operation.value;
  if (operation.operator === "division")
    return Math.floor(1 / +operation.value);
}
function two(operation) {
  if (!operation) return 2;
  if (operation.operator === "add") return 2 + +operation.value;
  if (operation.operator === "sub") return 2 - +operation.value;
  if (operation.operator === "multi") return 2 * +operation.value;
  if (operation.operator === "division")
    return Math.floor(2 / +operation.value);
}
function three(operation) {
  if (!operation) return 3;
  if (operation.operator === "add") return 3 + +operation.value;
  if (operation.operator === "sub") return 3 - +operation.value;
  if (operation.operator === "multi") return 3 * +operation.value;
  if (operation.operator === "division")
    return Math.floor(3 / +operation.value);
}
function four(operation) {
  if (!operation) return 4;
  if (operation.operator === "add") return 4 + +operation.value;
  if (operation.operator === "sub") return 4 - +operation.value;
  if (operation.operator === "multi") return 4 * +operation.value;
  if (operation.operator === "division")
    return Math.floor(4 / +operation.value);
}
function five(operation) {
  if (!operation) return 5;
  if (operation.operator === "add") return 5 + +operation.value;
  if (operation.operator === "sub") return 5 - +operation.value;
  if (operation.operator === "multi") return 5 * +operation.value;
  if (operation.operator === "division")
    return Math.floor(5 / +operation.value);
}
function six(operation) {
  if (!operation) return 6;
  if (operation.operator === "add") return 6 + +operation.value;
  if (operation.operator === "sub") return 6 - +operation.value;
  if (operation.operator === "multi") return 6 * +operation.value;
  if (operation.operator === "division")
    return Math.floor(6 / +operation.value);
}
function seven(operation) {
  if (!operation) return 7;
  if (operation.operator === "add") return 7 + +operation.value;
  if (operation.operator === "sub") return 7 - +operation.value;
  if (operation.operator === "multi") return 7 * +operation.value;
  if (operation.operator === "division")
    return Math.floor(7 / +operation.value);
}
function eight(operation) {
  if (!operation) return 8;
  if (operation.operator === "add") return 8 + +operation.value;
  if (operation.operator === "sub") return 8 - +operation.value;
  if (operation.operator === "multi") return 8 * +operation.value;
  if (operation.operator === "division")
    return Math.floor(8 / +operation.value);
}
function nine(operation) {
  if (!operation) return 9;
  if (operation.operator === "add") return 9 + +operation.value;
  if (operation.operator === "sub") return 9 - +operation.value;
  if (operation.operator === "multi") return 9 * +operation.value;
  if (operation.operator === "division")
    return Math.floor(9 / +operation.value);
}

function plus(num) {
  return { operator: "add", value: num };
}
function minus(num) {
  return { operator: "sub", value: num };
}
function times(num) {
  return { operator: "multi", value: num };
}
function dividedBy(num) {
  return { operator: "division", value: num };
}

// console.log(zero(plus(2)));

class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const mergeTwoLists = function (list1, list2) {
  let curNode = new ListNode();
  let dummy = curNode;
  while (list1 && list2) {
    if (list1.val < list2.val) {
      curNode.next = list1;
      list1 = list1.next;
    } else {
      curNode.next = list2;
      list2 = list2.next;
    }
    curNode = curNode.next;
  }

  if (list1) {
    curNode.next = list1;
  }
  if (list2) {
    curNode.next = list2;
  }

  return dummy.next;
};

// console.log(mergeTwoLists([1, 2, 4], [1, 3, 4]));

const findJudge = function (n, trust) {
  if (trust.length == 0 && n == 1) return 1;
  const data = {};
  for (let i = 0; i < trust.length; i++) {
    if (!data[trust[i][1]]) {
      data[trust[i][1]] = 1;
    } else {
      data[trust[i][1]] += 1;
    }
  }

  for (let i in data) {
    if (data[i] == n - 1) {
      for (let j = 0; j < trust.length; j++) {
        if (trust[j][0] == i) return -1;
      }

      return i;
    }
  }

  return -1;
};

// console.log(
//   findJudge(3, [
//     [1, 3],
//     [2, 3],
//     [3, 1],
//   ])
// );

const climbStairs = function (n) {
  const febArr = [1, 1];
  for (let i = 0; i < n; i++) {
    febArr.push(febArr[i] + febArr[i + 1]);
  }
  console.log(febArr);
  return febArr[n];
};

const climbStairsRecessive = (n, memo) => {
  let result;
  if (memo[n]) {
    return memo[n];
  }
  if (n == 0 || n == 1) {
    result = 1;
  } else {
    result =
      climbStairsRecessive(n - 1, memo) + climbStairsRecessive(n - 2, memo);
  }
  memo[n] = result;
  return result;
};
// console.log(climbStairs(42));
// console.log(climbStairsRecessive(42, {}));

// function TreeNode(val, left, right) {
//   this.val = val === undefined ? 0 : val;
//   this.left = left === undefined ? null : left;
//   this.right = right === undefined ? null : right;
// }

// const exNode = {
//   val: 3,
//   left: { val: 9, right: null, left: null },
//   right: {
//     val: 20,
//     right: { val: 7, right: null, left: null },
//     left: { val: 15, right: null, left: { val: 33, right: null, left: null } },
//   },
// };

var maxDepth = function (root) {
  let maxDepth = 0;
  let digNode = (node, level) => {
    if (!node) return;

    if (maxDepth < level) maxDepth = level;
    digNode(node.right, level + 1);
    digNode(node.left, level + 1);
  };

  digNode(root, 1);

  return maxDepth;
};

var minDepth = function (root) {
  let min = [];
  let digNode = (node, level) => {
    if (!node) return;
    if (!node.right && !node.left) {
      min.push(level);
    }
    digNode(node.left, level + 1);
    digNode(node.right, level + 1);
  };
  digNode(root, 1);
  if (min.length == 0) {
    return 0;
  }
  return Math.min(...min);
};

var deleteDuplicates = function (head) {
  let dummy = head;
  while (head && head.next) {
    if (head.next.val == head.val) {
      head.next = head.next.next;
    } else {
      head = head.next;
    }
  }
  return dummy;
};

// var maxProfit = function (prices) {
//   const profits = [];
//   const subs = [];
//   for (let i = 0; i < prices.length - 1; i++) {
//     let compares = [];
//     for (let j = i + 1; j < prices.length; j++) {
//       if (compares.includes(prices[j])) {
//         continue;
//       }
//       profits.push(prices[j] - prices[i]);
//       compares.push(prices[j]);
//     }
//   }
//   return Math.max(...profits) > 0 ? Math.max(...profits) : 0;
// };
const adding = (arr) => {
  let result = [];
  for (let i = 0; i < arr.length - 1; i++) {
    result.push(arr[i] + arr[i + 1]);
  }
  return result;
};

const generate = function (numRows) {
  const pascalTriangle = [[1], [1, 1]];
  for (let i = 1; i < numRows; i++) {
    let [lastRow] = pascalTriangle.slice(-1);
    let nums = adding(lastRow);
    let pascalArr = [1, ...nums, 1];
    pascalTriangle.push(pascalArr);
  }

  return pascalTriangle[numRows];
};

const isPalindrome = function (s) {
  const filterString = s
    .toLowerCase()
    .split("")
    .filter((s) => s.toUpperCase() !== s.toLowerCase() || !isNaN(s))
    .join("")
    .split(" ")
    .join("");
  return filterString.split("").reverse().join("") == filterString;
};

// console.log(isPalindrome("A man, a plan, a canal: Panama"));

// 17. Letter Combinations of a Phone Number
const letterCombinations = function (digits) {
  if (digits.length == 0) return [];
  const result = [];
  let possibilities = [];
  const digitsValues = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };
  for (let i = 0; i < digits.length; i++) {
    possibilities.push(digitsValues[digits[i]]);
  }
  if (possibilities.length == 1) return possibilities[0];

  const firstDigits = possibilities.shift();
  console.log(possibilities);
  for (let i = 0; i < firstDigits.length; i++) {
    for (let j = 0; j < possibilities.length + 1; j++) {
      let str = firstDigits[i];

      possibilities.forEach((element) => {
        str += element[j];
      });
      result.push(str);
    }
  }

  // return result;
};

// console.log(letterCombinations("234"));

// Input: digits = "23"
// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

// Moving Zeros To The End

// moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]

function moveZeros(arr) {
  const filteredArr = arr.filter((e) => e !== 0);
  arr.forEach((e) => (e === 0 ? filteredArr.push(e) : ""));

  return filteredArr;
}

// console.log(moveZeros([8, false, {}, true, 3, 4, 4, "0"]));
// console.log(moveZeros([false, 0, "0", 1, {}]));

const mySqrt = function (x) {
  if (x == 0) return 0;
  if (x == 1) return 1;
  if (x == 2) return 1;
  for (let i = 1; i < x; i++) {
    if (i * i === x) return i;
    if (i * i > x) return i - 1;
  }
};

// console.log(mySqrt(3));

const capitals = function (word) {
  const result = [];
  word.split("").forEach((letter, index) => {
    if (letter.toUpperCase() == letter) result.push(index);
  });
  return result;
};

// console.log(capitals("MohaMed"));

const strStr = function (haystack, needle) {
  if (!haystack.includes(needle)) return -1;
  const haystackArray = haystack.split("");

  for (let i = 0; i < haystackArray.length; i++) {
    if (needle.startsWith(haystack[i])) {
      let loop = 0;
      let needleInStack = "";
      while (needle[loop] == haystack[i + loop] && needle[loop] !== undefined) {
        needleInStack += haystack[i + loop];
        loop++;
      }
      if (needleInStack == needle) return i;
    }
  }
};

function findMissingLetter(array) {
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const firstLetter = alphabet.find((e) => e == array[0].toUpperCase());
  if (firstLetter) {
    for (let i = 0; i < array.length; i++) {
      if (
        array[i].toUpperCase() != alphabet[alphabet.indexOf(firstLetter) + i]
      ) {
        return array[i].toUpperCase() == array[i]
          ? alphabet[alphabet.indexOf(firstLetter) + i]
          : alphabet[alphabet.indexOf(firstLetter) + i].toLowerCase();
      }
    }
  }
}

//

//

//

function humanReadable(num) {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  while (num > 0) {
    if (num < 60) {
      seconds = num;
      num = 0;
    }

    if (num >= 60) {
      if (minutes >= 60) {
        minutes = 0;
        hours += 1;
      }

      minutes += 1;

      if (minutes == 60) {
        minutes = 0;
        hours += 1;
      }
      num = num - 60;
    }
  }

  return `${hours.toString().length < 2 ? `0${hours}` : hours}:${
    minutes.toString().length < 2 ? `0${minutes}` : minutes
  }:${seconds.toString().length < 2 ? `0${seconds}` : seconds}`;
}

// console.log(humanReadable(3600));

// async function sleep(millis) {
//   await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("delay");
//     }, millis);
//   });
// }

// let t = Date.now();
// sleep(1000).then(() => console.log(Date.now() - t)); // 100

// const myPromise = async (num) => {
//   return await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (num > 5) {
//         resolve("You Win 🎉");
//       } else {
//         reject("Game Over 🎰");
//       }
//     }, 1000);
//   });
// };

// async function getPromiseValue(num) {
//   try {
//     const res = await myPromise(num);
//     console.log(res);
//   } catch (err) {
//     console.log(err);
//   }
// }

// getPromiseValue(1);

// const createCounter = function (n) {
//   let closure = -1;
//   return function () {
//     closure++;
//     return n + closure;
//   };
// };

// /**
//  * const counter = createCounter(10)
//  * counter() // 10
//  * counter() // 11
//  * counter() // 12
//  */
// const counter = createCounter(10);

// console.log(counter());
// console.log(counter());
// console.log(counter());

// nums = [1,2,3,4]
// fn = function sum(acc, curr) { return acc + curr; }
// init = 0
// Output: 10

const reduce = function (nums, fn, init) {
  if (nums.length <= 0) return init;
  let acc = init;
  nums.forEach((e) => {
    const newAcc = fn(acc, e);
    acc = newAcc;
  });

  return acc;
};

Array.prototype.last = function () {
  return this.length > 0 ? this[this.length - 1] : -1;
};

const flat = function (arr, n) {
  const result = [];
  let depth = n;

  arr.forEach((e) => {
    if (!Array.isArray(e)) {
      result.push(e);
    } else {
      if (depth > 0) {
        result.push(...flat(e, depth - 1));
      } else {
        result.push(e);
      }
    }
  });

  return result;
};

let arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];

// console.log(flat(arr, 2));

// Input: functions = [x => x + 1, x => x * x, x => 2 * x], x = 4
// Output: 65

const compose = function (f) {
  const reverse = f.reverse();
  return function (x) {
    if (f.length <= 0) return x;
    const result = reverse.map((e) => {
      let oldX = x;
      x = e(x);
      return e(oldX);
    });
    return result.slice(-1)[0];
  };
};

// console.log(compose([(x) => 10 * x, (x) => 10 * x, (x) => 10 * x]));

//  { increment: Function, decrement: Function, reset: Function }

const createCounter = function (init) {
  class Counter {
    constructor(init) {
      this.value = init;
    }

    increment() {
      this.value++;
      return this.value;
    }

    decrement() {
      this.value--;
      return this.value;
    }

    reset() {
      this.value = init;
      return this.value;
    }
  }

  return new Counter(init);
};

const majorityElement = function (nums) {
  const arrayElements = {};
  nums.forEach((num) => {
    if (!arrayElements[num]) {
      arrayElements[num] = 1;
    } else {
      arrayElements[num] = arrayElements[num] + 1;
    }
  });
  let majority;
  let bigger = 0;
  for (let num in arrayElements) {
    if (arrayElements[num] > bigger) {
      bigger = arrayElements[num];
      majority = num;
    }
  }

  return majority;
};
// console.log(majorityElement([2, 2, 1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1]));

//

///

// Input: callCount = 5
// Output: [0,1,1,2,3]
// Explanation:
// const gen = fibGenerator();
// gen.next().value; // 0
// gen.next().value; // 1
// gen.next().value; // 1
// gen.next().value; // 2
// gen.next().value; // 3

const fibGenerator = function* (callCount) {
  let fibArray = [0, 1];

  for (let i = 2; i < callCount; i++) {
    fibArray.push(fibArray.slice(-2)[0] + fibArray.slice(-2)[1]);
  }
  yield [...fibArray];
};

// const ss = fibGenerator(5);

// console.log(Object.keys({ name: "mohamed", age: 30 }).length);

var sortBy = function (arr, fn) {
  let arrayFromFn = arr.map((num) => {
    const sortBy = fn(num);
    return {
      toReturn: num,
      sortBy,
    };
  });
  return arrayFromFn.sort((a, b) => a.sortBy - b.sortBy).map((e) => e.toReturn);
};

//

const chunk = function (arr, size) {
  const result = [];
  let chunk = [];
  for (let i = 0; i < arr.length; i++) {
    if (chunk.length < size) {
      chunk.push(arr[i]);
    }

    if (chunk.length === size) {
      result.push(chunk);
      chunk = [];
    } else if (i === arr.length - 1) {
      result.push(chunk);
    }
  }

  return result;
};

console.log(chunk([1, 9, 6, 3, 2], 3));
