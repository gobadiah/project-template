const auth = jest.genMockFromModule('../auth');

auth.signin.mockImplementation(() => 'signin');

module.exports = auth;
