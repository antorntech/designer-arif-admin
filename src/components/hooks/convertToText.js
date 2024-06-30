const ones = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const teens = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const tens = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];
const suffixes = ["", "thousand", "million", "billion", "trillion"];

function convertToText(amount) {
  if (amount === 0) return "zero";

  const chunks = [];
  while (amount > 0) {
    chunks.push(amount % 1000);
    amount = Math.floor(amount / 1000);
  }

  let text = "";
  for (let i = chunks.length - 1; i >= 0; i--) {
    const chunk = chunks[i];
    if (chunk === 0) continue;

    const chunkText = convertChunk(chunk);
    text += chunkText + " " + suffixes[i] + " ";
  }

  return text.trim();
}

function convertChunk(chunk) {
  if (chunk === 0) return "";

  let text = "";
  const hundreds = Math.floor(chunk / 100);
  if (hundreds > 0) {
    text += ones[hundreds] + " hundred ";
    chunk %= 100;
  }

  if (chunk >= 20) {
    const tensDigit = Math.floor(chunk / 10);
    text += tens[tensDigit] + " ";
    chunk %= 10;
  }

  if (chunk >= 10 && chunk <= 19) {
    text += teens[chunk - 10];
  } else if (chunk >= 1 && chunk <= 9) {
    text += ones[chunk];
  }

  return text.trim();
}

export default convertToText;
