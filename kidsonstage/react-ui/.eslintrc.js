module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        }, 
    "rules": {
        "func-style": ["error", "declaration", { "allowArrowFunctions": true }],
        "react/jsx-filename-extension": "off",
        "jsx-a11y/alt-text": "off",
        "jsx-a11y/href-no-hash": "off",
        "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }], 
        "no-plusplus": "off"       
    },
    "parser": "babel-eslint",
    "plugins": [
        "jsx-a11y"
      ],                                                                         
};