module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
  },
  "env": {
    "browser":true,
    "es6": true,
    "jest": true,
    "jasmine": true,
  },
  "rules": {
    "no-underscore-dangle": ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "jsx-a11y/anchor-is-valid": [ "error", { "components": [ "Link" ], "specialLink": [ "to" ]}],
    "linebreak-style": 0,
    "no-underscore-dangle": 0,
    "jsx-a11y/label-has-for": [ 2, {
        "components": [ "Label" ],
        "required": {
            "some": [ "nesting", "id" ]
        },
        "allowChildren": false,
    }],
  },
}