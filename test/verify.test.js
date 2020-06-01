const jwt = require('../src');
const payload = { firstName: 'John' };
const token = jwt.sign(payload, 'secret');

describe('verify', () => {
  describe('decoding', () => {
    it('should return the same payload data', () => {
      const decoded = jwt.verify(token, 'secret');
      expect(decoded.firstName).toEqual(payload.firstName);
    });
  });
  it('should fail when the token is altered', () => {
    let newToken = token.replace(token[1], '_');
    const t = () => {
      jwt.verify(newToken, 'secret');
    };
    expect(t).toThrow(Error);
  });
  it('should fail when the token signature is altered', () => {
    const parts = token.split('.');
    parts[2] = parts[2].replace(parts[2][1], '_');
    const t = () => {
      jwt.verify(parts.join('.'), 'secret');
    };
    expect(t).toThrow(Error);
  });
  it('should throw error if no secret is specified and algorithm is not none', () => {
    const token = jwt.sign(payload, 'secret', { alg: 'HS256' });
    expect(() => {
      jwt.verify(token);
    }).toThrow(Error);
  });
  it('should work with unsecured jwt', () => {
    const token = jwt.sign(payload);
    expect(() => {
      jwt.verify(token);
    }).not.toThrow(Error);
  });
  it('should fail if expiration date is exceeded', () => {
    const token = jwt.sign(payload, 'secret', { exp: -1 });
    expect(() => {
      jwt.verify(token, 'secret');
    }).toThrow(Error);
  });
});
