module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["./e2e/testSetup.ts"],
  collectCoverageFrom: ["**/*.ts", "!**/e2e/helpers/**", "!**/node_modules/**"],
}
