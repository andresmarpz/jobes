// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config & import('prettier-plugin-tailwindcss').PluginOptions}
 */
const config = {
  trailingComma: "none",
  tabWidth: 2,
  semi: false,
  singleQuote: false,
  arrowParens: "avoid",
  endOfLine: "auto",
  printWidth: 100,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
