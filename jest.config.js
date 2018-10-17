const log = require("fancy-log");
const colors = require("ansi-colors");

const isWatchModeActivated = /:watch/.test(process.env.npm_lifecycle_event);

if (isWatchModeActivated) {
  log(colors.cyan("Jest running in watch mode ..."));
}

module.exports = {
  moduleFileExtensions: ["js", "json", "vue"],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest"
  },
  // support the same @ -> src alias mapping in source code
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  // serializer for snapshots
  snapshotSerializers: ["jest-serializer-vue"],
  collectCoverage: false,
  collectCoverageFrom: [
    "**/*.{js,vue}",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/coverage/**"
  ],
  coverageReporters: ["html", "text-summary"],
  reporters: [isWatchModeActivated ? "default" : "jest-dot-reporter"]
};
