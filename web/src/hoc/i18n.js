import i18n from '~/config/i18n';

export default ({ req, namespaces }) => new Promise((resolve) => {
  if (req) {
    resolve(i18n.getInitialProps(req, namespaces));
  } else {
    resolve({});
  }
});
