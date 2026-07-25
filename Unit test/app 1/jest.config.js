/**
 * Jest Configuration File
 * 
 * This file configures Jest to properly handle Vue 3 components
 * and run Jasmine-style tests.
 */

export default {
  // Use jsdom environment to simulate browser
  // This allows DOM testing in Node.js
  testEnvironment: 'jsdom',

  // Tell Jest how to transform Vue files
  // vue3-jest compiles .vue files for testing
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
  },

  // Module file extensions Jest looks for
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],

  // Module name mapper for handling non-JS imports
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Setup files that run before tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Test file pattern
  testMatch: ['**/__tests__/**/*.spec.js', '**/?(*.)+(spec|test).js'],

  // Collect coverage from these files
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/**/*.spec.js',
  ],

  // Don't transform node_modules
  transformIgnorePatterns: ['/node_modules/'],

  // Global test timeout
  testTimeout: 10000,
};
