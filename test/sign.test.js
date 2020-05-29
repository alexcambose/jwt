const jwt = require('../src');

const payload = { firstName: 'John' };

const encodeBase64 = (string) => new Buffer(string).toString('base64');
const decodeBase64 = (string) => new Buffer(string, 'base64').toString('ascii');

describe('sign', () => {
  describe('encoding', () => {
    it('should properly encode the header', () => {
      const token = jwt.sign(payload);
      const [header] = token.split('.');
      expect(() => {
        const decoded = decodeBase64(header);
        const _ = JSON.parse(decoded);
      }).not.toThrow(error);
    });
    it('should properly encode the payload', () => {
      const token = jwt.sign(payload);
      const [, payload] = token.split('.');
      expect(() => {
        const decoded = decodeBase64(payload);
        const _ = JSON.parse(decoded);
      }).not.toThrow(error);
    });
  });
  describe('default parameters', () => {
    it('should set the default algorithm', () => {
      const token = jwt.sign(payload);
      const [header] = token.split('.');
      const { alg } = JSON.parse(header);
      expect(alg).toEqual('HS256');
    });
  });
  describe('options', () => {
    it('should change the algorithm accordingly', () => {
      const token = jwt.sign(payload, { algorithm: 'none' });
      const [header] = token.split('.');
      const { alg } = JSON.parse(header);
      expect(alg).toEqual('none');
    });
    it('should set the payload', () => {
      const token = jwt.sign(payload);
      const [, tokenPayload] = token.split('.');
      expect(payload).toEqual(JSON.parse(tokenPayload));
    });
  });
  describe('unsecured jwt', () => {
    it('should remove the signature', () => {
      const token = jwt.sign(payload, { alg: 'none' });
      const [, , signature] = token.split('.');
      expect(signature).toBeFalsy();
    });
  });
});
