const nextJest = require("next/jest");

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
    // Add more setup options before each test is run
    // moduleDirectories: ["node_modules", "<rootDir>/"],
    setupFilesAfterEnv: ["./jest.setup.js"],
    testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(config);
