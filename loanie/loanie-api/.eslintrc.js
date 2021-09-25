module.exports = {
  env: {
    es6: true,
    node: true,
    jasmine: true
  },
  extends: "airbnb",
  parserOptions: {
    sourceType: "module",
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
