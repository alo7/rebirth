module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "typescript",
    "import",
  ],
  parserOptions: {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true
    }
  },
  rules: {
    "eqeqeq": [ "error", "always", { null: "ignore" } ],
    "typescript/class-name-casing": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-extra-parens": 0,
    "no-unreachable": "error",
    "guard-for-in": "error",
    "no-eval": "error",
    "no-with": "error",
    "no-undef-init": "error",
    "comma-spacing": [ "error", { "before":false,"after":true } ],
    "array-bracket-spacing": [ "error", "always" ],
    "max-len": [ 1, 150 ],
    "no-trailing-spaces": "error",
    "semi": [ "error", "always" ],
    "no-regex-spaces": "error",
    "no-return-await": "error",
    "require-await": "error",
    "no-const-assign": "error",
    "no-duplicate-imports": "error",
    "prefer-const": [ "error", { "destructuring": "all", } ],
  }
};
