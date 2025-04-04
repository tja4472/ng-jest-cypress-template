import { defineConfig } from 'cypress';

// https://docs.cypress.io/app/references/configuration

export default defineConfig({
  defaultBrowser: 'chrome',
  defaultCommandTimeout: 10000,

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // we can grab some process environment variables
      // and stick it into config.env before returning the updated config
      // config.env = config.env || {};
      // config.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST;

      return config;
    },
    baseUrl: 'http://localhost:4200',
  },

  retries: {
    runMode: 3,
    openMode: 2,
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
});
