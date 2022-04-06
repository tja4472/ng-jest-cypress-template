- [1. ng-jest-cypress-template](#1-ng-jest-cypress-template)
  - [1.1. Create project](#11-create-project)
  - [1.2. Add eslint](#12-add-eslint)
  - [1.3. Add prettier](#13-add-prettier)
    - [1.3.1. Install](#131-install)
    - [1.3.2. Add .prettierignore](#132-add-prettierignore)
    - [1.3.3. Add .prettierrc.json](#133-add-prettierrcjson)
    - [1.3.4. Install eslint-config-prettier:](#134-install-eslint-config-prettier)
    - [1.3.5. Update .eslintrc.json](#135-update-eslintrcjson)
    - [1.3.6. Edit package.json](#136-edit-packagejson)
  - [1.4. Add jest](#14-add-jest)
    - [1.4.1. Remove karma & jasmine](#141-remove-karma--jasmine)
    - [1.4.2. Install](#142-install)
    - [1.4.3. Create setup-jest.ts](#143-create-setup-jestts)
    - [1.4.4. Create jest.config.js](#144-create-jestconfigjs)
    - [1.4.5. Edit tsconfig.json](#145-edit-tsconfigjson)
    - [1.4.6. Edit tsconfig.spec.json](#146-edit-tsconfigspecjson)
    - [1.4.7. Edit package.json](#147-edit-packagejson)
  - [1.5. Add cypress](#15-add-cypress)
    - [1.5.1. Websites](#151-websites)
    - [1.5.2. Install Cypress](#152-install-cypress)
    - [1.5.3. Update cypress.json](#153-update-cypressjson)
    - [1.5.4. Update package.json](#154-update-packagejson)
    - [1.5.5. Add tsconfig.json](#155-add-tsconfigjson)
    - [1.5.6. Add typescipt.spec.ts](#156-add-typesciptspects)
    - [1.5.7. Add Angular test files](#157-add-angular-test-files)
      - [1.5.7.1. Add po.ts](#1571-add-pots)
      - [1.5.7.2. Add angular.spec.ts](#1572-add-angularspects)
- [Extras](#extras)
  - [Jest paths mapping](#jest-paths-mapping)
    - [Typescript config](#typescript-config)
    - [Jest config](#jest-config)
- [App Actions](#app-actions)

# 1. ng-jest-cypress-template

## 1.1. Create project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.8.

```bash
ng new ng-jest-cypress-template --style=scss --routing --strict
```

## 1.2. Add eslint

https://github.com/angular-eslint/angular-eslint

```bash
ng add @angular-eslint/schematics
```

## 1.3. Add prettier

### 1.3.1. Install

```bash
npm install --save-dev --save-exact prettier
```

### 1.3.2. Add .prettierignore

```
package.json
package-lock.json
dist
build
```

### 1.3.3. Add .prettierrc.json

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve",
  "endOfLine": "auto"
}
```

### 1.3.4. Install eslint-config-prettier:

```bash
npm install --save-dev --save-exact eslint-config-prettier
```

### 1.3.5. Update .eslintrc.json

```json
{
  "extends": [
    "plugin:@angular-eslint/recommended",
    "plugin:@angular-eslint/template/process-inline-templates",
    "prettier"
  ]
}
```

### 1.3.6. Edit package.json

```json
{
  "scripts": {
    "prettier:check": "prettier --check .",
    "prettier:write": "prettier --write ."
  }
}
```

## 1.4. Add jest

https://github.com/thymikee/jest-preset-angular

### 1.4.1. Remove karma & jasmine

```bash
npm remove karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter @types/jasmine jasmine-core
```

```bash
rm ./karma.conf.js ./src/test.ts
```

### 1.4.2. Install

```bash
npm install --save-dev --save-exact jest jest-preset-angular @types/jest
```

### 1.4.3. Create setup-jest.ts

In project root:

```ts
import 'jest-preset-angular/setup-jest';
```

### 1.4.4. Create jest.config.js

In project root:

```js
require('jest-preset-angular/ngcc-jest-processor');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
};
```

### 1.4.5. Edit tsconfig.json

See https://github.com/cypress-io/cypress-and-jest-typescript-example

```json
{
  // Required for jest to work with cypress
  "include": ["src/*.ts"],
  "exclude": ["src/*.spec.ts"]
  //
}
```

### 1.4.6. Edit tsconfig.spec.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "esModuleInterop": true,
    "outDir": "./out-tsc/spec",
    "types": ["jest"]
  },
  "files": ["src/polyfills.ts"],
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}
```

### 1.4.7. Edit package.json

```json
{
  "scripts": {
    // ...
    "test": "jest"
    // ...
  }
}
```

## 1.5. Add cypress

### 1.5.1. Websites

- https://www.cypress.io/
- [GitHub](https://github.com/cypress-io/cypress)

### 1.5.2. Install Cypress

```bash
npm install --save-dev --save-exact cypress
```

```bash
npx cypress open
```

### 1.5.3. Update cypress.json

```json
{
  "baseUrl": "http://localhost:4200",
  "defaultCommandTimeout": 10000
}
```

### 1.5.4. Update package.json

```json
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run"
  }
}
```

### 1.5.5. Add tsconfig.json

In `cypress` folder

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "sourceMap": false,
    "strict": true,
    "types": ["cypress"]
  },
  "include": ["**/*.ts"]
}
```

### 1.5.6. Add typescipt.spec.ts

In `cypress/integration` folder.

```ts
it('works', () => {
  cy.wrap('foo').should('equal', 'foo');
});
```

### 1.5.7. Add Angular test files

#### 1.5.7.1. Add po.ts

In `cypress\support` folder.

```ts
// we could place this url into cypress.json as "baseUrl"
const url = 'http://localhost:4200';

export const navigateTo = () => cy.visit(url);

export const getGreeting = () => cy.get('.toolbar > span');
```

#### 1.5.7.2. Add angular.spec.ts

In `cypress\integrations\`

```ts
import { navigateTo, getGreeting } from '../support/po';

describe('Hello Angular', () => {
  beforeEach(navigateTo);

  it('should display welcome message', () => {
    getGreeting().contains('Welcome');
  });
});
```

# Extras

## Jest paths mapping

### Typescript config

```ts
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@app/*": ["src/app/*"]
    }
  }
}
```

### Jest config

```js
module.exports = {
  /*
    https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping/

    tsconfig.json
    "paths": {
      "@app/*": ["src/app/*"]
    }
  */
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
  },
};
```
# App Actions
- https://glebbahmutov.com/blog/testing-angular-application-via-app-actions/
- https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/
- 