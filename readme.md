# Week3 Challenges: Components in TS

- Day 1.
- Day 2.
- Day 3.
- Day 4.
- Day 5. WE:

## Configuraciones (Proyecto anterior)

- Editor config
- EsLint + Prettier
- Jest + ES6
- Git + Initial commit
- carpeta src (contenedor de los challenges) + .gitkeep

rama feature/config

- Husky
- GitHub actions
- SonarCloud

## Configuraciones (Day 1)

- TS / ESLint-TS /

## Instalación (Day 1)

### Instalación de TS

```shell
npm i -D typescript @types/node
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm i -D ts-jest @types/jest jest-ts-webcompat-resolver

```

### Config

```shell
tsc --init
```

- Ajustes config

- "target": "ESNext"
- "module": "ESNext"
- "rootDir": "./src"
- "moduleResolution": "node"
- "outDir": "./dist"
- "esModuleInterop": true
- "forceConsistentCasingInFileNames": true
- "strict": true
- "skipLibCheck": true

- Config ESLint

```json
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
```

- Config Jest: jest.config.js

```js
/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver'
};
```
