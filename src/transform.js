const { traverse } = require('./traverse');

const transform = (node) => {
  traverse(node, {
    CallExpression: {
      enter({ node }) {
        if (specialForms[node.name]) {
          specialForms[node.name](node);
        }
      },
    },
  });

  return node;
};

const specialForms = {
  // (var num 2)
  var(node) {
    console.log(JSON.stringify(node, null, false));

    // [{"type":"Identifier","name":"num"},{"type":"NumericLiteral","value":3}]
    const [identifier, assignment] = node.arguments;
    node.type = 'VariableDeclaration';

    node.identifier = identifier;
    node.assignment = assignment;

    delete node.name;
    delete node.arguments;
  },
};

module.exports = {
  specialForms,
  transform,
};
