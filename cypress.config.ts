/* eslint-disable import/no-import-module-exports */
import { defineConfig } from 'cypress';

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
  },
  projectId: 'jwwjty',
});
