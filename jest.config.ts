// https://thymikee.github.io/jest-preset-angular/docs/getting-started/installation
// https://thymikee.github.io/jest-preset-angular/docs/getting-started/presets/#createcjspresetoptions
import presets from 'jest-preset-angular/presets';
import type { Config } from 'jest';

const presetConfig = presets.createCjsPreset({
  //...options
});

const jestConfig: Config = {
  ...presetConfig,
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  // globalSetup: 'jest-preset-angular/global-setup',
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  /*
    https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping/

    tsconfig.json
    "baseUrl": "src",    
    "paths": {
      "@app/*": ["app/*"]
    }
  */
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
  },
  resolver: '<rootDir>/jest-resolver.js',
};

export default jestConfig;
