module.exports = {
  useRelativePaths: false,
  danglingCommas: true,
  excludes: [
    'dist',
    'src/.next',
  ],
  environments: ['jest'],
  moduleNameFormatter({ moduleName, pathToCurrentFile }) {
    return moduleName.replace(/^src/, '~');
  },
};
