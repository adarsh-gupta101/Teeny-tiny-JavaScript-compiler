module.exports= function parse(tokens) {
    let current = 0;
  
    function parseProgram() {
      let statements = [];
      while (current < tokens.length) {
        statements.push(parseStatement());
      }
      return { type: 'Program', body: statements };
    }
  
    function parseStatement() {
      let token = tokens[current];
  
      // Handle print statements: print <expression> ;
      if (token.type === 'Keyword' && token.value === 'print') {
        current++; // consume 'print'
        let expr = parseExpression();
        expect(';');
        return { type: 'PrintStatement', expression: expr };
      }
  
      // Handle assignment: Identifier '=' <expression> ;
      if (token.type === 'Identifier') {
        // Lookahead for '=' operator
        if (tokens[current + 1] && tokens[current + 1].value === '=') {
          let id = { type: 'Identifier', name: token.value };
          current++; // consume identifier
          current++; // consume '='
          let expr = parseExpression();
          expect(';');
          return { type: 'AssignmentExpression', identifier: id, expression: expr };
        }
      }
  
      // Otherwise, treat it as an expression statement.
      let expr = parseExpression();
      expect(';');
      return { type: 'ExpressionStatement', expression: expr };
    }
  
    function expect(char) {
      let token = tokens[current];
      if (!token || token.value !== char) {
        throw new SyntaxError("Expected '" + char + "', found " + (token ? token.value : "EOF"));
      }
      current++;
    }
  
    // Expression: handles addition and subtraction
    function parseExpression() {
      let node = parseTerm();
      while (current < tokens.length && (tokens[current].value === '+' || tokens[current].value === '-')) {
        let op = tokens[current].value;
        current++;
        let right = parseTerm();
        node = { type: 'BinaryExpression', operator: op, left: node, right: right };
      }
      return node;
    }
  
    // Term: handles multiplication and division
    function parseTerm() {
      let node = parseFactor();
      while (current < tokens.length && (tokens[current].value === '*' || tokens[current].value === '/')) {
        let op = tokens[current].value;
        current++;
        let right = parseFactor();
        node = { type: 'BinaryExpression', operator: op, left: node, right: right };
      }
      return node;
    }
  
    // Factor: handles numbers, identifiers, and parenthesized expressions
    function parseFactor() {
      let token = tokens[current];
      if (token.type === 'Number') {
        current++;
        return { type: 'NumericLiteral', value: token.value };
      }
      if (token.type === 'Identifier') {
        current++;
        return { type: 'Identifier', name: token.value };
      }
      if (token.value === '(') {
        current++; // consume '('
        let node = parseExpression();
        expect(')');
        return node;
      }
      throw new SyntaxError("Unexpected token: " + token.value);
    }
  
    return parseProgram();
  }
  