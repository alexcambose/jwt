# JWT

Simple JWT library for educational purposes only

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
// ...
```

Setting additional options

```js
const data = { firstName: 'John' };
const secret = 'secretString123';
const token = jwt.sign(data, secret, {
  expiration: 60 * 60 // 1 hour
  algorithm: 'HS256',
});
//...
```

#### Verifying a token

```js
const token = '...';
const secret = 'secretString123';
const data = jwt.verify(token, secret);
// { firstName: 'John' }
```
