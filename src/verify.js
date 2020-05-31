const crypto = require('crypto');
const base64url = require('base64url');

module.exports = (token, secret) => {
  const [tokenHeader, tokenPayload, tokenSignature] = token.split('.');
  const header = JSON.parse(base64url.decode(tokenHeader));
  const payload = JSON.parse(base64url.decode(tokenPayload));
  if (header.alg === 'HS256' && secret) {
    const signature = crypto.createHmac('sha256', secret).update(`${tokenHeader}.${tokenPayload}`).digest('base64');
    if (signature !== tokenSignature) {
      throw new Error('Invaid signature');
    }
  }
  return payload;
};
