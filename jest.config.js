/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/test/"],
  testMatch: ["**/*.test.ts"],
  setupFiles: ["<rootDir>/test/setup-tests.ts"],
};
