/**
 * Jest Setup File
 * 
 * This file runs before any tests and configures the test environment.
 * Use it for global mocks and setup.
 */

// Mock window.confirm globally
global.confirm = jest.fn(() => true);

// Suppress Vue warnings in tests (optional)
// import { config } from '@vue/test-utils';
// config.global.config.warnHandler = () => null;
