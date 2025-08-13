globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: 'tsconfig.spec.json',
};

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.html$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['/node_modules/(?!flat)/'],
  moduleDirectories: ['node_modules', 'src'],
  fakeTimers: {
    enableGlobally: false,
  },

  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.module.ts',
    '!src/app/**/*.interface.ts',
    '!src/app/**/*.enum.ts',
    '!src/app/**/*.model.ts',
    '!src/app/**/*.spec.ts',
    '!src/app/app.config.*',
    '!src/app/app.routes.*',
    '!src/**/*.stories.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
