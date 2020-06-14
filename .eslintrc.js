module.exports = {
  extends: 'amex',
  rules: {
    // enable additional rules
    'max-len': ['warn', 110],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/forbid-prop-types': 0,
    'react/jsx-props-no-spreading': 0,

    // override default options for rules from base configurations
    'no-cond-assign': ['error', 'always'],
    'no-unused-vars': [2, {
      vars: 'all', varsIgnorePattern: '^_', args: 'all', argsIgnorePattern: '^_',
    }],
    camelcase: [0],

    // disable rules from base configurations
  },
};
