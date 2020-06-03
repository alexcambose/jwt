const crypto = require('crypto');
const base64url = require('base64url');

module.exports = (token, secret) => {
  const [tokenHeader, tokenPayload, tokenSignature] = token.split('.');
  const header = JSON.parse(base64url.decode(tokenHeader));
  const payload = JSON.parse(base64url.decode(tokenPayload));
  // only run verification on non 'none' headers
  if (header.alg === 'HS256') {
    // secret required
    if (!secret) {
      throw new Error('Secret required');
    }
    // recalclate the signature based on the header and payload
    const signature = crypto.createHmac('sha256', secret).update(`${tokenHeader}.${tokenPayload}`).digest('base64');
    // the essential part, checking if the signatures match
    if (base64url.fromBase64(signature) !== tokenSignature) {
      throw new Error('Invaid signature');
    }
  }
  // if the `exp` claim is set, verify the date
  if (payload.exp && payload.exp < Date.now()) {
    throw new Error('Expired token');
  }
  return payload;
};
