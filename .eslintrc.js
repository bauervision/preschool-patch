module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  //parser: "babel-eslint",
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
  plugins: ["react", "react-hooks"],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "arrow-parens": ["error", "always"],
    "arrow-body-style": ["off"],
    "brace-style": ["warn", "1tbs", { allowSingleLine: true }],
    "comma-dangle": ["error", "only-multiline"],
    "function-paren-newline": "off",
    "import/no-extraneous-dependencies": 0,
    "import/no-named-default": "off",
    "import/prefer-default-export": 0,
    // indent: [
    //   2,
    //   2,
    //   {
    //     SwitchCase: 1
    //   }
    // ],
    "key-spacing": ["error", { mode: "minimum" }],
    "linebreak-style": [0, "error", "windows"],
    "max-len": 0,
    "newline-per-chained-call": "off",
    "no-console": 1,
    "no-nested-ternary": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "no-trailing-spaces": "warn",
    "no-unused-expressions": ["error", { allowTernary: true }],
    "object-curly-newline": "off",
    radix: ["error", "as-needed"],
    "react/forbid-prop-types": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-curly-brace-presence": "off",
    "react/jsx-first-prop-new-line": [2, "multiline"],
    "react/no-did-mount-set-state": "off",
    "react/no-did-update-set-state": "off",
    "react/prop-types": 0,
    "react/prefer-stateless-function": 0,
    "react/require-default-props": 0,
    "react/self-closing-comp": 0,
    "spaced-comment": ["error", "always", { markers: ["/"] }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],

      }
    }
  },
};
