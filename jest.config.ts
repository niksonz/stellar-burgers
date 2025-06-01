<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest'
<<<<<<< HEAD
=======
=======
import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}]
  },
  moduleNameMapper: {
    '@api': '<rootDir>/src/utils/burger-api.ts',
    '@auth': '<rootDir>/src/utils/auth.ts',
    '@slices': '<rootDir>/src/services/slices'
  }
>>>>>>> 36a7110ee045e5115498695bf78e858e83e62b82
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
};

export default config;
