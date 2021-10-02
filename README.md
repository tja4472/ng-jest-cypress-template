- [NgAngularfireTestbed](#ngangularfiretestbed)
  - [Create project](#create-project)
  - [Add eslint](#add-eslint)
  - [Add prettier](#add-prettier)
    - [Install](#install)
    - [Add .prettierignore](#add-prettierignore)
    - [Add .prettierrc.json](#add-prettierrcjson)
    - [Install eslint-config-prettier:](#install-eslint-config-prettier)
    - [Update .eslintrc.json](#update-eslintrcjson)
    - [Edit package.json](#edit-packagejson)
  - [Add jest](#add-jest)
    - [Remove karma & jasmine](#remove-karma--jasmine)
    - [Install](#install-1)
    - [Create setup-jest.ts](#create-setup-jestts)
    - [Create jest.config.js](#create-jestconfigjs)
    - [Edit tsconfig.spec.json](#edit-tsconfigspecjson)
    - [Edit package.json](#edit-packagejson-1)

# NgAngularfireTestbed

## Create project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.8.

```bash
ng new ng-angularfire-testbed --style=css --routing --strict
```

## Add eslint

https://github.com/angular-eslint/angular-eslint

```bash
ng add @angular-eslint/schematics
```

## Add prettier

### Install

```bash
npm install --save-dev --save-exact prettier
```

### Add .prettierignore

```
package.json
package-lock.json
dist
build
```

### Add .prettierrc.json

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

### Install eslint-config-prettier:

```bash
npm install --save-dev --save-exact eslint-config-prettier
```

### Update .eslintrc.json

```json
{
  "extends": [
    "plugin:@angular-eslint/recommended",
    "plugin:@angular-eslint/template/process-inline-templates",
    "prettier"
  ]
}
```

### Edit package.json

```json
{
  "scripts": {
    "prettier:check": "prettier --check .",
    "prettier:write": "prettier --write ."
  }
}
```

## Add jest

https://github.com/thymikee/jest-preset-angular

### Remove karma & jasmine

```bash
npm remove karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter @types/jasmine jasmine-core
```

```bash
rm ./karma.conf.js ./src/test.ts
```

### Install

```bash
npm install --save-dev --save-exact jest jest-preset-angular @types/jest
```

### Create setup-jest.ts

In project root:

```ts
import 'jest-preset-angular/setup-jest';
```

### Create jest.config.js

In project root:

```js
require('jest-preset-angular/ngcc-jest-processor');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
};
```

### Edit tsconfig.spec.json

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

### Edit package.json

```json
{
  "scripts": {
    // ...
    "test": "jest"
    // ...
  }
}
```
