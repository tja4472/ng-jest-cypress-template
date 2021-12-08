require('jest-preset-angular/ngcc-jest-processor');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
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
};
