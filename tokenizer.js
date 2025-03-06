module.exports = function tokenize(input) {
  let tokens = [];
  let current = 0;

  while (current < input.length) {
    let char = input[current];

    // Skip whitespace
    if (/\s/.test(char)) {
      current++;
      continue;
    }

    // Numbers (integer only for simplicity)
    if (/\d/.test(char)) {
      let value = "";
      while (/\d/.test(input[current])) {
        value += input[current++];
      }
      tokens.push({ type: "Number", value: Number(value) });
      continue;
    }

    // Identifiers and Keywords (letters and underscore)
    if (/[a-zA-Z_]/.test(char)) {
      let value = "";
      while (/[a-zA-Z_0-9]/.test(input[current])) {
        value += input[current++];
      }
      // If the identifier is a keyword like 'print'
      if (value === "print") {
        tokens.push({ type: "Keyword", value });
      } else {
        tokens.push({ type: "Identifier", value });
      }
      continue;
    }

    // Operators and punctuation: =, +, -, *, /, ;, (, )
    if ("=+-*/;()".includes(char)) {
      tokens.push({ type: "Punctuation", value: char });
      current++;
      continue;
    }

    throw new TypeError("Unexpected character: " + char);
  }

  return tokens;
};
