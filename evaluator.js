module.exports= function evaluate(node, env = {}) {
    switch (node.type) {
      case 'Program':
        let result;
        for (let stmt of node.body) {
          result = evaluate(stmt, env);
        }
        return result;
  
      case 'ExpressionStatement':
        return evaluate(node.expression, env);
  
      case 'NumericLiteral':
        return node.value;
  
      case 'BinaryExpression':
        let left = evaluate(node.left, env);
        let right = evaluate(node.right, env);
        switch (node.operator) {
          case '+': return left + right;
          case '-': return left - right;
          case '*': return left * right;
          case '/': return left / right;
          default: throw new Error("Unknown operator: " + node.operator);
        }
  
      case 'AssignmentExpression':
        let value = evaluate(node.expression, env);
        env[node.identifier.name] = value;
        return value;
  
      case 'Identifier':
        if (node.name in env) {
          return env[node.name];
        } else {
          throw new ReferenceError("Undefined variable: " + node.name);
        }
  
      case 'PrintStatement':
        let output = evaluate(node.expression, env);
        console.log(output);
        return output;
  
      default:
        throw new Error("Unknown node type: " + node.type);
    }
  }
  