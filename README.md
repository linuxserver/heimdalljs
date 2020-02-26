# Heimdall (heimdall)

An application management portal

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

### Build the app for production
```bash
quasar build
```
