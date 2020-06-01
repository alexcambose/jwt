const crypto = require('crypto');
const base64url = require('base64url');

module.exports = (token, secret) => {
  const [tokenHeader, tokenPayload, tokenSignature] = token.split('.');
  const header = JSON.parse(base64url.decode(tokenHeader));
  const payload = JSON.parse(base64url.decode(tokenPayload));
  if (header.alg === 'HS256') {
    if (!secret) {
      throw new Error('Secret required');
    }
    const signature = crypto.createHmac('sha256', secret).update(`${tokenHeader}.${tokenPayload}`).digest('base64');
    if (base64url.fromBase64(signature) !== tokenSignature) {
      throw new Error('Invaid signature');
    }
  }
  if (payload.exp && payload.exp < Date.now()) {
    throw new Error('Expired token');
  }
  return payload;
};
