import createApp from '~/app';
import config from '~/config';

const app = createApp(config.dev);

app.then((server) => {
  server.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening to ${config.port}`);
  });
});
