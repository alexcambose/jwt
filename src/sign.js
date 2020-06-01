const crypto = require('crypto');
const base64url = require('base64url');
const _ = require('lodash');

module.exports = (payloadData, secret, options = {}) => {
  // create header object
  const header = {
    alg: 'HS256',
    ..._.pick(options, ['alg']),
  };
  if (options.exp) {
    options.exp += Math.round(new Date().getTime() / 1000);
  }
  const payload = {
    iat: Math.round(new Date().getTime() / 1000),
    ..._.omit(options, ['alg']),
    ...payloadData,
  };
  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));
  if (!secret) {
    header.alg = 'none';
    const encodedHeader = base64url(JSON.stringify(header));

    return `${encodedHeader}.${encodedPayload}.`;
  }
  const signature = crypto.createHmac('sha256', secret).update(`${encodedHeader}.${encodedPayload}`).digest('base64');
  const encodedSignature = base64url.fromBase64(signature);
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
};
