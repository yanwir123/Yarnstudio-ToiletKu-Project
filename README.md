# React + TypeScript + Vite

**A modern frontend development starter built for speed, scalability, and maintainability.**

This project provides a lightweight development environment for building React applications with TypeScript and Vite. It includes Hot Module Replacement (HMR) for a faster development experience and ESLint for maintaining code quality.

---

## Overview

| Technology                                    | Purpose                                     |
| --------------------------------------------- | ------------------------------------------- |
| [React](https://react.dev/)                   | Component-based user interface development  |
| [TypeScript](https://www.typescriptlang.org/) | Static typing and improved code reliability |
| [Vite](https://vite.dev/)                     | Fast development server and build tooling   |
| [ESLint](https://eslint.org/)                 | Code quality and consistency checks         |

## Getting Started

### Prerequisites

Ensure the following tools are installed:

- [Node.js](https://nodejs.org/) — use a version compatible with your dependencies.
- npm — included with Node.js.

### Installation

**1. Clone the repository**

```bash
git clone <repository-url>
cd <project-directory>
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

## Available Scripts

| Command           | Description                             |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Starts the development server with HMR. |
| `npm run build`   | Builds the application for production.  |
| `npm run lint`    | Runs ESLint checks.                     |
| `npm run preview` | Previews the production build locally.  |

These commands depend on the scripts configured in `package.json`.

## React Plugins

Vite supports two official React plugins for this starter configuration.

### 1. `@vitejs/plugin-react`

Uses the Oxc-powered transformation pipeline for React development and Fast Refresh.

Documentation: [Vite React Plugin](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react)

### 2. `@vitejs/plugin-react-swc`

Uses [SWC](https://swc.rs/) for fast compilation and React Fast Refresh.

Documentation: [Vite React SWC Plugin](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react-swc)

Choose the plugin that best fits your development requirements. Both options do not need to be installed simultaneously.

## React Compiler

React Compiler is not enabled by default in this starter because it can affect development and build performance.

To learn how to enable it, follow the official guide:

[React Compiler Installation](https://react.dev/learn/react-compiler/installation)

Evaluate its impact on your application before enabling it in your development workflow.

## ESLint Configuration

The starter includes ESLint rules to help identify potential issues and maintain consistent code quality.

For production applications, consider enabling type-aware linting through `typescript-eslint`.

### Recommended type-aware rules

The following configurations can be used in `eslint.config.js`:

- `tseslint.configs.recommendedTypeChecked` — recommended type-aware rules.
- `tseslint.configs.strictTypeChecked` — stricter type-aware checks.
- `tseslint.configs.stylisticTypeChecked` — additional stylistic rules.

These configurations can be adapted to your existing ESLint setup. Configure the TypeScript project paths correctly before enabling type-aware linting.

For reference, see the [typescript-eslint documentation](https://typescript-eslint.io/).

### React-specific linting

Additional React lint rules are available through:

- [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)
- [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)

These plugins can extend linting coverage for React components and React DOM usage.

Install and configure them according to their official documentation if your project requires additional checks.

## Project Structure

A typical project structure may look like this:

```text
project/
├── public/             # Static public assets
├── src/                # Application source code
│   ├── assets/         # Images, icons, and other assets
│   ├── App.tsx         # Root application component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

The actual structure may differ depending on the features and architecture of your application.

## Production Build

Generate an optimized production build:

```bash
npm run build
```

To preview the generated build locally:

```bash
npm run preview
```

Vite typically outputs production assets to the `dist/` directory.

## Repository Guidelines

To keep the repository clean and maintainable:

- Exclude `node_modules/` and generated build output from version control.
- Keep `package.json` and the relevant lockfile committed.
- Never commit API keys, credentials, or other sensitive environment variables.
- Document required environment variables using an `.env.example` file when applicable.
- Keep dependencies and development tools up to date.
- Run lint checks before submitting changes.

## Contributing

Contributions and improvements are welcome.

1. Create a dedicated branch for your changes.
2. Follow the project's existing coding conventions.
3. Test your changes locally.
4. Run the lint and build commands.
5. Submit your changes through a pull request.

## License

Specify the applicable license for this project before distributing or reusing the source code.

---

<p align="center">
  <strong>Built with React, TypeScript & Vite</strong>
  <br />
  <sub>A clean foundation for modern web development.</sub>
</p>
