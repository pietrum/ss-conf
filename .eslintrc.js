module.exports = {
  'env': {
    'es6': true,
    'jest': true,
    'node': true
  },
  'extends': 'airbnb-base',
  'parserOptions': {
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2, {
        'SwitchCase': 1
      }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
  }
};
