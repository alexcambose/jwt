const crypto = require('crypto');
const base64url = require('base64url');
const _ = require('lodash');
/**
 * Return a JSON Web Token
 * @param {Object} payloadData - Token payload data
 * @param {String} secret - Secret signing string
 * @param {Object} options - Options object
 * @returns {String} - JsonWebToken
 */
module.exports = (payloadData, secret, options = {}) => {
  // create header object and set default header parameters
  const header = {
    alg: 'HS256',
    ..._.pick(options, ['alg']),
  };
  /**
   * (optional)
   * Instead of setting the expiration date as the number of seconds sice Epoch,
   * we will set that as a duration in seconds
   * expiration date = current date + duration
   */
  if (options.exp) {
    options.exp += Math.round(new Date().getTime() / 1000);
  }
  // set the payload
  // also add the "Issued at" claim
  const payload = {
    iat: Math.round(new Date().getTime() / 1000),
    ..._.omit(options, ['alg']),
    ...payloadData,
  };
  // base64UrlEncode stringified header
  const encodedHeader = base64url(JSON.stringify(header));

  // base64UrlEncode stringified payload
  const encodedPayload = base64url(JSON.stringify(payload));
  // if the secret isn't set, then set alg to none
  if (!secret || header.alg === 'none') {
    header.alg = 'none';
    const encodedHeader = base64url(JSON.stringify(header));

    return `${encodedHeader}.${encodedPayload}.`;
  }
  // generate the signature
  const signature = crypto.createHmac('sha256', secret).update(`${encodedHeader}.${encodedPayload}`).digest('base64');
  const encodedSignature = base64url.fromBase64(signature);

  // append each part to the final result
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
};
