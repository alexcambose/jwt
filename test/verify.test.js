const jwt = require('../src');
const payload = { firstName: 'John' };
const token = jwt.sign(payload, 'secret');

describe('verify', () => {
  describe('decoding', () => {
    it('should return the same payload', () => {
      const decoded = jwt.verify(token, secret);
      expect(decoded).toEqual(payload);
    });
  });
  it('should fail when token is altered', () => {
    let newToken = token;
    newToken[1] = '_';
    const t = () => {
      jwt.verify(newToken, 'secret');
    };
    expect(t).toThrow(TypeError);
  });
  it('should fail when token signature is altered', () => {
    const parts = token.split('.');
    parts[2][1] = '_';
    const t = () => {
      jwt.verify(newToken, 'secret');
    };
    expect(t).toThrow(TypeError);
  });
  it('should fail if expiration date is exceeded', () => {});
});
