const jwt = require('../src');
const base64url = require('base64url');

const payload = { firstName: 'John' };

describe('sign', () => {
  describe('encoding', () => {
    it('should properly encode the header', () => {
      const token = jwt.sign(payload);
      const [header] = token.split('.');
      expect(() => {
        const decoded = base64url.decode(header);
        const _ = JSON.parse(decoded);
      }).not.toThrow(Error);
    });
    it('should properly encode the payload', () => {
      const token = jwt.sign(payload);
      const [, tokenPayload] = token.split('.');
      expect(() => {
        const decoded = base64url.decode(tokenPayload);
        const _ = JSON.parse(decoded);
      }).not.toThrow(Error);
    });
  });
  describe('default parameters', () => {
    describe('should set the default algorithm', () => {
      it('should set to HS256 in case secret is specified', () => {
        const token = jwt.sign(payload, 'secret');
        const [header] = token.split('.');
        const { alg } = JSON.parse(base64url.decode(header));
        expect(alg).toEqual('HS256');
      });
      it('should set to none if no secret is specified', () => {
        const token = jwt.sign(payload);
        const [header] = token.split('.');
        const { alg } = JSON.parse(base64url.decode(header));
        expect(alg).toEqual('none');
      });
    });
  });
  describe('options', () => {
    it('should change the algorithm accordingly', () => {
      const token = jwt.sign(payload, 'secret', { alg: 'none' });
      const [header] = token.split('.');
      const { alg } = JSON.parse(base64url.decode(header));
      expect(alg).toEqual('none');
    });
    it('should set the payload', () => {
      const token = jwt.sign(payload);
      const [, tokenPayload] = token.split('.');
      const decodedPayload = JSON.parse(base64url.decode(tokenPayload));
      expect(payload.firstName).toEqual(decodedPayload.firstName);
    });
  });
  describe('unsecured jwt', () => {
    it('should remove the signature', () => {
      const token = jwt.sign(payload);
      const [, , signature] = token.split('.');
      expect(signature).toBeFalsy();
    });
  });
});
