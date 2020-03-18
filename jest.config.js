module.exports = {
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["./e2e/testSetup.ts"],
  collectCoverageFrom: ["**/*.ts", "!**/e2e/helpers/**", "!**/node_modules/**"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/site/__mocks__/styleMock.ts",
  },
}
