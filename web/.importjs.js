module.exports = {
  danglingCommas: true,
  moduleNameFormatter({ moduleName, pathToCurrentFile }) {
   if (moduleName.startsWith('src')) {
     return moduleName.replace('src', '~');
   }

   // Fall back to the original specifier. It's important that this function
   // always returns a string.
   return moduleName;
  },

  useRelativePaths: false,
  excludes: [
    './src/components/base/*.js',
    './src/styles/styled-components.js',
    './dist/**',
    './reports/**',
  ]
  // continue with the rest of your settings...
}
