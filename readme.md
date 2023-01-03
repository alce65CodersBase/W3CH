# Week3 Challenges: Components in TS

- Day 1. GoT
- Day 2. CRUD List (ToDo, Pets...) with TS Components
- Day 3.
- Day 4. Series with TS Components
- Day 5. WE: Pokemons with TS Components

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

### Instalación de Vite

(Ver fichero aparte)

### Instalación Testing-Library

npm i -D jest-environment-jsdom
npm i -D @testing-library/dom -> render, screen...
npm i -D @testing-library/jest-dom -> matchers extra
npm i -D @testing-library/user-event

("@types/testing-library__dom": "^7.5.0")

- Config: jest.config.ts

```js
  { testEnvironment: 'jsdom', }
```

## Day 1. GoT

### Testing
