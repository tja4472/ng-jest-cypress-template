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
