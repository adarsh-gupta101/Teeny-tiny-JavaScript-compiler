// import { tokenize } from './tokenizer.js';
// import { parse } from './parser.js';
// import evaluate from './evaluator.js'

const tokenize  = require('./tokenizer.js');
const parse  = require('./parser.js');
const evaluate = require('./evaluator.js');

function run(input) {
    const tokens = tokenize(input);
    const ast = parse(tokens);
    return evaluate(ast);
  }
  
  // Example program in TinyLang:
  const code = `
    x =  3 * 4;
    y = 4*5;
    print y;
    print (x + y);
  `;
  
  run(code);