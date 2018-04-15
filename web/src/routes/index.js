import NProgress from 'nprogress';

const routes = require('next-routes')();

routes
  .add('index', '/', 'index_')
  .add('some-page')
  .add('generate-error')
  .add('account')
  .add('signin')
  .add('register')
  .add('home')
  .add('video', '/videos/:id')
  .add('session', '/sessions/:id');

const { Router } = routes;

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

module.exports = routes;
