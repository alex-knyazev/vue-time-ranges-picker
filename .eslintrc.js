module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'
  ],
  // required to lint *.vue files
  plugins: ['vue'
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/max-attributes-per-line': 'off',
    'no-unused-vars': ['warn'
    ],
    'vue/html-indent': ['warn'
    ],
    'vue/valid-v-on': 'off',
    'vue/attribute-hyphenation': 'off',
  },
};
