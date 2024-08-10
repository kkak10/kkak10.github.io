import type { Config } from "jest";
import nextJest from "next/jest.js";

const esModules = [
  "react-markdown",
  "vfile.*",
  "unist-.+",
  "rehype.*",
  "unified",
  "bail",
  "is-.+",
  "trough",
  "remark-.+",
  "mdast-util-.+",
  "micromark.*",
  "parse-entities",
  "character-entities",
  "property-information",
  "comma-separated-tokens",
  "hast-.+",
  "hastscript",
  "space-separated-tokens",
  "decode-named-character-reference",
  "ccount",
  "escape-string-regexp",
  "markdown-table",
  "trim-lines",
  "web-namespaces",
  "zwitch",
  "html-void-elements",
  "github-slugger",
  "refractor",
  "character-.+",
  "direction",
  "bcp-47-match",
  "stringify-entities",
].join("|");

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  // 절대 경로 사용시
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

async function jestConfig() {
  const nextJestConfig = await createJestConfig(config)();
  // @ts-ignore
  nextJestConfig.transformIgnorePatterns[0] = `/node_modules/(?!${esModules}).+.(js|jsx|mjs|cjs|ts|tsx)$/`;

  return nextJestConfig;
}

module.exports = jestConfig;
