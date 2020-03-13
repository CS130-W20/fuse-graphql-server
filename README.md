# fuse back-end

## Directory Structure
- `.githooks` contains the githooks for enforcing style and testing
- `node_modules` contains installed npm packages
- `prisma` contains the prisma configs and generated typescript client
- `src` contains the source code for the graphql server
    - `resolvers` contains the graphql resolvers for the app
    - `constants.js` contains some global constants
    - `index.js` is the main entry point of the server
    - `schema.graphql` defines the server API
    - `utils.js` holds useful helper functions
- `tests` contains unit tests to verify queries and mutations are working correctly
- `.eslintrc.js` defines the style guide
- `package.json` defines the dependencies and scripts for the server
- `README.md` gives a description of the server and setup instructions
- `setup.sh` enables the githooks

## Running
Make sure you have Node 12.14.1 (LTS) installed.
Recommended, use nvm to manage node versions.

* clone the repo
* cd to the top directory
* run `npm install`
* run `npm run setup`
* run `npm start`
* verify that it worked by going to the logged url

## Workflow
* In IntelliJ, search settings for "ESLint" and enable automatic configuration.
* Before commiting, code will need to pass an automated linting check.