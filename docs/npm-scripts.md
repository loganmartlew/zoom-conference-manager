# ⚙️ NPM Scripts

## Serve

The following scripts are for serving apps within the nx workspace.

`npm start` - Serves the default project (not recommended).
`npm run start:client` - Serves the client app.
`npm run start:api` - Serves the project's API.
`npm run start:app` - Serves both the client and API concurrently.

## Lint

The following scripts are for linting the project.

`npm run lint` - Runs the linter on the default app (not recommended).
`npm run lint:client` - Runs the linter on the client app.
`npm run lint:api` - Runs the linter on the project API.
`npm run lint:all` - Runs the linter on all projects and libraries in the nx workspace.
`npm run lint:affected` - Runs the linter on projects and libraries affected by current changes.

## Test

The following scripts are for testing the project.

`npm run test` - Runs tests on the default app (not recommended).
`npm run test:client` - Runs tests on the client app.
`npm run test:api` - Runs tests on the project API.
`npm run test:all` - Runs tests on all projects and libraries in the nx workspace.
`npm run test:affected` - Runs tests on projects and libraries affected by current changes.

## Build

The following scripts are for building the project.

`npm run build` - Builds the default project (not recommended).
`npm run build:client` - Builds the client app.
`npm run build:api` - Builds the projects API.
`npm run build:app` - Builds both the client and API concurrently.
`npm run build:image` - Builds all docker images in the project.
