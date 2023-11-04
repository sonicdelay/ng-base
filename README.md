# NG-Base

Angular Base with initial setup for local linting, formating, testing and git
automation

Features:

- ESLint — a tool to report patterns within JavaScript
- Prettier — An opinionated code formatter
- Husky - Git hooks for Javascript e.g. `Pre-Commit`
- Lint-staged - Lint files staged by git
- CommitLint - Verify format of commit messages
- JEST - Test framework
- Cypress - E2E and component testing framework

### Article Links

- [Git config](https://www.git-scm.com/book/en/v2/Customizing-Git-Git-Configuration)
- [Angular](https://angular.io/guide/setup-local)
- [ESLint & Prettier for NG16](https://blog.bitsrc.io/how-ive-set-up-eslint-and-prettier-in-angular-16-and-why-i-did-that-4bfc304284a6)
  - [ESLint & Prettier & Husky & lint-staged](https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9)
- [CommitLint](https://commitlint.js.org/#/concepts-commit-conventions)
- [JEST](https://github.com/briebug/jest-schematic)
- [Cypress](https://github.com/cypress-io/cypress/tree/develop/npm/cypress-schematic)

The tool chain of this repo can also be setup mannually following the follwoing
setup

## GIT

```
git clone <this repo>
git config user.name "<user.name>"
git config user.email "<user.email>"
git config pull.rebase true
```

## Angular

```
npm install -g @angular/cli
ng new <app>  (--directory ./)
```

Add script to `package.json`

```
"dev": "ng serve --proxy-config proxy.config.json --host=0.0.0.0 --port=<port> --disable-host-check --open",
```

Create `proxy.config.json`

```
{
  "/api/*": {
    "target": "http://localhost:<port>",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": false,
    "pathRewrite": {
      "^/api": "/api"
    }
  }
}
```

Ports: e.g. 4210 for frontend and 8421 for backend

Start development with:

```
npm run dev
```

## ESLint & Prettier

```
ng add @angular-eslint/schematics
npm i -D prettier
cat .gitignore>.eslintignore
cat .gitignore>.prettierignore
```

Create `.prettierrc.json`

```
{
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "semi": true,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "trailingComma": "es5",
  "bracketSameLine": true,
  "printWidth": 80,
  "endOfLine": "auto"
}
```

Add the following to `eslintrc.json`

```
{
  ...
  "overrides": [
    {
      ...
      "extends": [
        ..."plugin:prettier/recommended"

      ],
      ...
    },
    {
      ...
      "excludedFiles": ["*inline-template-*.component.html"],
      "extends": [
        ...
        "plugin:prettier/recommended"
      ],
      "rules": {
        "prettier/prettier": [
          "error",
          {
            "parser": "angular"
          }
        ]
      }
    }
  ]
}
```

Add optional script to `package.json`

```
"lint:fix": "ng lint --fix"
```

### Connect ESlint and Prettier

```
npm install prettier-eslint eslint-config-prettier eslint-plugin-prettier --save-dev
```

Add optional script to `package.json`

```
"prettier": "npx prettier --write ."
```

Settings `.vscode/settings.json`.

```
{
  ...
  "[html]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "editor.formatOnSave": false
  },
  "[typescript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "editor.formatOnSave": false
  }
  ...
}
```

Add Extensions to `.vscode/extensions.json`.

```
{
  "recommendations": [
    ...
    "dbaeumer.vscode-eslint"
  ]
}
```

## Husky

```
npx husky-init
```

Change test script in `package.json`

```
"test": "ng test --watch=false"
```

## Lint-Staged

```
npm i -D lint-staged
```

Create `.lintstagedrc`

```
{ "_.{js, jsx,ts,tsx}": [ "eslint --quiet --fix" ],
"_.{json,js,ts,jsx,tsx,html}": [ "prettier --write --ignore-unknown" ] }
```

Change/Add `.husky/pre-commit`

```
npm run lint-staged ...
```

Add script to `package.json`

```
"lint-staged": "npx lint-staged"
```

## CommitLint

```
npm install -D @commitlint/config-conventional @commitlint/cli
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
npm pkg set scripts.commitlint="commitlint --edit"
```

Create `commitlint.config.js`

```
module.exports = {
  extends: [
    "@commitlint/config-conventional",
  ],
};
```

Test:

```
git commit -m "foo: this should fail"
```

## JEST

```
npm i -D jest @types/jest
ng add @briebug/jest-schematic
```

Verify

```
npm test
```

If you use `VSCode Test Explorer` replace `jest.config.js`

```
const config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [],
};

if (!process.argv.some(item => item.includes('@angular\\cli\\bin\\ng'))) {
  config.setupFilesAfterEnv = ['<rootDir>/setup-jest.ts'];
}

module.exports = config;
```

Add `setup-jest.ts`

```
import 'jest-preset-angular/setup-jest';
```

optional add to `tsconfig.json`

```
...
"esModuleInterop": true
```

Settings `.vscode/settings.json`.

```
{
  ...
  "jest.autoRun": {
    "watch": false,
    "onStartup": ["all-tests"],
    "onSave": "test-src-file"
  },
  "jest.showCoverageOnLoad": true,
  "jest.coverageColors": {
    "covered": "rgba(9, 255, 65, 0.4)",
    "uncovered": "rgba(121, 31, 10, 0.3)",
    "partially-covered": "rgba(235, 198, 52, 0.4)"
  }
  ...
}
```

## Cypress

```
ng add @cypress/schematic
```

Change script test in `package.json`

```
"test": "cypress run --config video=false --component"
```

if you are facing problems with global assertions conflicting with jest:

```
npm install -D local-cypress
```
