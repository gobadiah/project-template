# Web template

[![Dependencies](https://david-dm.org/gobadiah/project-template.svg?path=web)]()

## Getting started

After installing all dependencies (see web install in `kb`), just run 

```
npm run dev
```

## About

This is a [nextjs](https://github.com/zeit/next.js/) project, e.g. a universal javascript app running on a server using node and in the browser.

Nextjs takes care of the major headaches setting up such an app, regarding webpack and so on.

The main technology involve is [React](https://reactjs.org/) which is a frontend library created at facebook. Some ideas are components, which can be pure functions, stateless or statefull es2015 class, with lifecycles and rendered using jsx (See the docs).

On top of that, we use a variety of libraries to achieve several purposes : 

* Internationalization using [i18next](https://www.i18next.com/)
* Famous [Babel](https://babeljs.io/) for compiler
* [Redux](https://redux.js.org/) as a "state container"
* [Passport](http://www.passportjs.org/) to help with oauth (sign in using google and facebook)
* [Emotion](https://emotion.sh/) for styling our html
* [Redux JSON API](https://github.com/redux-json-api/redux-json-api) for talking to our api abiding by the [json:api](http://jsonapi.org/) spec
* [axios](https://github.com/axios/axios) for http request
* [express](http://expressjs.com) for the lightweight http server running our app

And some more for more targeted need. Regarding development : 

* [Jest](https://facebook.github.io/jest/) for running our tests
* [ESLint](https://eslint.org/) for linting
* [supertest](https://github.com/visionmedia/supertest) for testing the app (integration)

## Configuration

### I18n

* Set the available languages in `src/config/i18n.js`.
* Set the `fallbackLng` for default language.
* Set the available namespaces in `src/config/i18n.js`. 
* Write for eaches languages and each namespaces the translations in `locales/{{lng}}/{{ns}}.json`


## Running tests

Tests resides in `__tests__`, to run them : 

```
npm run test
```

which first clean, build, lint and then run the tests. Other commands are available see below. 

Test coverage is available in `reports/coverage` in various formats. 

## Available commands

* `npm run dev`: Launches the development server.
* `npm run clean`: Erase build outputs and reports.
* `npm run build`: Build the app, next/webpack for client, babel for server.
* `npm run start`: Start production server (needs `npm run build` to have run first).
* `npm run lint`: Lint the project using `eslint`.
* `npm run lint:ci`: Lint the project with continuous integration setting (just output some reporting).
* `npm run jest`: Run the tests (needs `npm run build` to have run first).
* `npm run jest:ci`: Run the test with CI configuration (output report and some config var).
* `npm run jest:coverage`: Run the test locally with coverage output.
* `npm run jest:watch`: Run the test locally continuously, tests are re-run on file change.
* `npm run jest:watch:coverage`: Watch and coverage behaviour cumulated.
* `npm run test`: Run everything, clean, build, lint and finally tests.
* `npm run test:coverage`: Same as previous with coverage.
* `npm run test:ci`: Same but with ci configuration (this is the command ran on ci).

## Directory structure

* `.babelrc`: Babel configuration file, see [that](https://babeljs.io/docs/usage/babelrc/).
* `.dockerignore`: Files not copied in docker image.
* `.eslintrc.json`: [Eslint configuration file](https://eslint.org/docs/user-guide/configuring).
* `__tests__`: Where tests resides.
* `bin`: Contains server launch script.
* `docker`: Dockerfile and build script.
* `locales`: Web localizations.
* `next.config.js`: nextjs config file.
* `src`: App source.

## Features

* `toast`: Show the user a [toast](https://ux.stackexchange.com/questions/11998/what-is-a-toast-notification). Using [react-toastify](https://github.com/fkhadra/react-toastify).

```
import { toast } from 'react-toastify';

// Later

toast.info('Show me a notification');
```
