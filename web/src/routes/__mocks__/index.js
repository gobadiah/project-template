const routes = jest.genMockFromModule('..');

routes.Router.replace.mockImplementation(() => {});

module.exports = routes;
