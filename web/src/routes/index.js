import NProgress from 'nprogress';

const routes = require('next-routes')();

routes
  .add('index', '/', 'index_')
  .add('some-page')
  .add('generate-error')
  .add('signin')
  .add('register');

const { Router } = routes;

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

module.exports = routes;
