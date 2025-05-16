module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: './',
    roots: ['<rootDir>/src', '<rootDir>/test'],
    testRegex: '.*\\.spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleNameMapper: {
      '^@middlewares/(.*)$': '<rootDir>/../src/middlewares/$1',
      '^@services/(.*)$': '<rootDir>/../src/services/$1',
      '^@entities/(.*)$': '<rootDir>/../src/entities/$1',
      '^@utils/(.*)$': '<rootDir>/../src/utils/$1',
      '^@config/(.*)$': '<rootDir>/../src/common/config/$1',
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: 'coverage',
};
  