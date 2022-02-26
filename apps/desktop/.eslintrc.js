module.exports = {
  root: true,
  plugins: ["prettier", "react-hooks"],
  extends: [
    "react-app",
    "react-app/jest",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "prettier/prettier": "error",
    "react-native/no-inline-styles": 0,
    "react/react-in-jsx-scope": 0,
    "jsx-quotes": 0,
    "no-shadow": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: { "{}": false },
        extendDefaults: true,
      },
    ],
    "@typescript-eslint/no-empty-interface": [
      "error",
      { allowSingleExtends: false },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn",
      { additionalHooks: "useRecoilCallback" },
    ],
  },
};
