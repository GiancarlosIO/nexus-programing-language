const { isOpeningParenthesis, isClosingParenthesis } = require('./identify');
const { specialForms } = require('./special-forms');
const { peek, pop } = require('./utilities');

const parenthesize = (tokens) => {
  const token = pop(tokens);

  if (isOpeningParenthesis(token.value)) {
    const expresion = [];

    // tokens is mutating in each recursion phase
    // that's why the while continue with its job
    while (!isClosingParenthesis(peek(tokens).value)) {
      expresion.push(parenthesize(tokens));
    }

    // delete the unnecessary closing parenthesis object
    pop(tokens);
    return expresion;
  }

  return token;
};

/**
 * tokens can be an array or a single element (object)
 * Because in the module.exports `parser` is executed with the result of parenthesize(tokens) as argument
 */
const parse = (tokens) => {
  if (Array.isArray(tokens)) {
    const [first, ...rest] = tokens;
    return {
      type: 'CallExpression',
      name: first.value,
      arguments: rest.map(parse),
    };
  }

  const token = tokens;

  if (token.type === 'Number') {
    return {
      type: 'NumericLiteral',
      value: token.value,
    };
  }

  if (token.type === 'String') {
    return {
      type: 'StringLiteral',
      value: token.value,
    };
  }

  if (token.type === 'Name') {
    return {
      type: 'Identifier',
      name: token.value,
    };
  }
};

module.exports = { parse: (tokens) => parse(parenthesize(tokens)) };
