# Heimdall (heimdall)

Heimdall is an application management portal for all your web applications. This version is the JavaScript rewrite of the original PHP version of Heimdall.

## Development Environment Setup

Building Heimdall requires a modern release of Node.js (the CI environment uses Node.js 14). Having a compatible version of Node, yarn and the `@quasar/cli` package installed is necessary to run the commands listed below. In addition, you will need to run this command in order to resolve the dependencies:

```bash
npm install
```

## Install

```bash
npm run setup
```

When asked `Where will the API live?`, the default `/` will work for most people, however, if you wish to run the app in development mode set it to `http://localhost:3000/`

### Run the backend server

```bash
npm run server
```

By default both the server and frontend will be accessible on port 3000

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

Front end will be accessible on port 8080

### Lint the files

```bash
yarn run lint
```

### Run unit tests

```bash
yarn test
```

### Build the app for production

```bash
quasar build
```
