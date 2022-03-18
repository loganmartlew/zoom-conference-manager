# 💻 Development Environment

It is helpful for the team to have a consistent development environment across all members. A consistent environment will assist in debugging issues with the code base, build tools and other aspects of the project. It will also make collaboration easier as we all know what the other team members have access to.

## Node.JS

This project was bootstrapped and set up using Node.js v16.14.2 lts. This was the current lts version of Node available when the project was started. It is recommended you either download this directly from [Node.JS](https://nodejs.org/en/), or install it with [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (node version manager).

## Visual Studio Code

VSCode is the most popular code editor/IDE according to the [StackOverflow 2021 Developer Survey](https://insights.stackoverflow.com/survey/2021#integrated-development-environment), and is the recommended IDE for this project as some extensions have been recommended. Code snippets have also been added to this project that can be used inside of VSCode.

### Extensions

- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components)

### Code Snippets

#### - tsfc

Generates a React functional component using the arrow syntax, as a default export, with an import to the React.FC interface, and a Props interface passed to the component. This snippet is also written in Typescript.

```ts
import { FC } from 'react';

interface Props {}

const index: FC<Props> = () => {
  return <div></div>;
};

export default index;
```

## Docker

This project has a docker-compose file along with Dockerfile's for each app. This means that the app is able to be run in a docker container out of the box, with support for a dev container, or deployment to a cloud platform.
