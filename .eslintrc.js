/* eslint-disable */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "globals": {
        cy: true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
         "plugin:cypress/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        "prettier/prettier": [
      1,
      {
        trailingComma: 'es5',
        singleQuote: false,
        semi: false,
      },
    ]
    }
}
