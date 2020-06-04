# JWT

Simple JWT library for educational purposes only

This module is part of these two Medium publications:

[How JWT works — in depth](https://medium.com/@alexcambose/how-jwt-works-in-depth-354cb5dc360d)

[How JWT works — in depth](https://medium.com/@alexcambose/how-jwt-works-in-depth-604c93ec20a4)

## Installation

With npm

```bash
npm i -S @alexcambose/jwt
```

```js
const jwt = require('@alexcambose/jwt');
```

### Usage

#### Creating a token

```js
const data = { firstName: 'John' };
const secret = 'secretString123';
const token = jwt.sign(data, secret);
// eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTEzMDYzMTksImZpcnN0TmFtZSI6IkpvaG4ifQ.twH5ckfRhGxOIp9Uonq31eFv7xws-xQdtFMOYDg1Wvk
```

Setting additional options

```js
const data = { firstName: 'John' };
const secret = 'secretString123';
const token = jwt.sign(data, secret, {
  expiration: 60 * 60 // 1 hour
  algorithm: 'HS256',
});
// eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTEzMDYzNTMsImV4cGlyYXRpb24iOjM2MDAsImFsZ29yaXRobSI6IkhTMjU2IiwiZmlyc3ROYW1lIjoiSm9obiJ9.ASNiEo8ZFm-SfSi_wpZUA2mVaCRwtesw6tJ-Fk_ayAk
```

#### Verifying a token

```js
const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTEzMDYzNTMsImV4cGlyYXRpb24iOjM2MDAsImFsZ29yaXRobSI6IkhTMjU2IiwiZmlyc3ROYW1lIjoiSm9obiJ9.ASNiEo8ZFm-SfSi_wpZUA2mVaCRwtesw6tJ-Fk_ayAk';
const secret = 'secretString123';
const data = jwt.verify(token, secret);
/*
{
  iat: 1591306353,
  expiration: 3600,
  algorithm: 'HS256',
  firstName: 'John'
}
*/
```
