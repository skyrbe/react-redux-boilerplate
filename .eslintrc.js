const path = require('path');

module.exports = {
  'env': {
    'browser': true,
    'jest': true,
    'es6': true,
    'node': true,
  },
  "parser": "babel-eslint",
  'extends': [
    'airbnb',
  ],
  'rules': {
    "max-len": [1, 120, 2, {ignoreComments: true}],
    "react/prop-types": 0,
    'react/destructuring-assignment': 0,
    'prefer-destructuring' : 0,
    'arrow-body-style': 0,
    'comma-dangle': 0,
    'import/no-extraneous-dependencies' : 0,
    'jsx-a11y/label-has-for' : 0,
    'import/no-mutable-exports' : 0,
    'import/no-unresolved': 0
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    }
  }
}
