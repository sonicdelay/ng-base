const config = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [],
};

if (!process.argv.some((item) => item.includes("@angular\\cli\\bin\\ng"))) {
  config.setupFilesAfterEnv = ["<rootDir>/setup-jest.ts"];
}

module.exports = config;
