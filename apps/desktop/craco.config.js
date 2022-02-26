const craco = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: "craco",
      options: {
        source: "tsconfig",
      },
    },
  ],
};
