/**
 * Babel Configuration
 * 
 * Configures Babel to transpile ES modules for Jest testing.
 */

export default {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ],
};
