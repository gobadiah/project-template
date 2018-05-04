# `src` directory

This directory contains the main sources for the web app.

The structure is as follows : 

  * `.next`: build directory, only managed by nextjs.
  * `app`: contains the express app, responsible for configuring the nextjs app
  and the express server.
  * `auth`: Contains authentication code, such as reducer (for storing the
  current user), forms (signin and register) and redux actions, triggered when
  a successful signin or signout occur.
  * `components`: Reusable react components, which are used accross pages and
  modules.
  * `config`: Exports configuration object, which read values from environment
  variables and exposes some configuration, such as server url, sentry dsn ...
  * `hoc`: hoc stands for 
  [higher-order component](https://reactjs.org/docs/higher-order-components.html).
  Our HOC main goal is to combine every `getInitialProps` methods we need for a nextjs page.
  For example, it might retrieve `i18n` translations, get the current user, get some object needed
  to display the page by making api calls, and so on.
  * `pages`: This is a nextjs directory. It contains every page for the site, which can be
  considered the "smart" components, or "container" components
  (see [https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0]()).
  In nextjs, this pages are match with a url (e.g. `pages/register.js` can be accessed through
  `/register`). However, we usually need more than that, like query parameters : `/my-object/5`
  should render `pages/my-object.js` and the id 5 should be accessible from inside the page.
  To do that we use [next-routes](https://github.com/fridays/next-routes) (see below `routes`).
  * `routes`: This is our routing module, based on
  [next-routes](https://github.com/fridays/next-routes). It's pretty straightforward.
  * `services`: Project dependencies that requires extra code and configuration to be used.
  * `static`: static files to be served by the server. Everything in it will be served at `/static`
  by nextjs. There is also a special subfolder called `build` where local files (in `components`)
  are copied to and their named changed using a hash.
  * `styles`: Contains general styles or styled-components for the site.
