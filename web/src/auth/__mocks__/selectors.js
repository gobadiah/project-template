const selectors = jest.genMockFromModule('../selectors');

const real = require.requireActual('../selectors');

selectors.currentUser.mockImplementation(real.currentUser);

module.exports = selectors;
