module.exports = {
  useFileSystemPublicRoutes: false,
  webpack: (config, { isServer }) => {
    // eslint-disable-next-line no-param-reassign
    config.node = {
      fs: 'empty',
    };

    config.module.rules.push({
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: '../static/build',
            publicPath: '/static/build/',
            emitFile: !isServer,
          },
        },
      ],
    });

    return config;
  },
};
