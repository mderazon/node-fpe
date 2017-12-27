# node-fpe [![Build Status](https://travis-ci.org/mderazon/node-fpe.svg?branch=master)](https://travis-ci.org/mderazon/node-fpe) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Simple format-preserving encryption implementation

In general, [format-preserving encryption](https://en.wikipedia.org/wiki/Format-preserving_encryption) is a type of encryption such that the output (the ciphertext) is in the same format as the input (the plaintext).

This library uses a simple FPE from a [prefix cipher](https://en.wikipedia.org/wiki/Format-preserving_encryption#FPE_from_a_prefix_cipher). The method is only useful for a small domains, for example numbers or alphanumeric.

## Usage

### Example:

cipher with default domain ([0-9]) and default encryption alg (aes-256-cbc):

```js
const fpe = require('node-fpe');
const cipher = fpe({ password: 'secret' });

cipher.encrypt('1234567');
// '4185730'

cipher.decrypt('4185730');
// '1234567'
```

cipher with custom domain ([A-E]) and default encryption alg (aes-256-cbc):

```js
const fpe = require('node-fpe');
const cipher = fpe({ password: 'secret', domain: ['A', 'B', 'C', 'D', 'E'] });

cipher.encrypt('BEEBEE');
// 'CBBCBB'

cipher.decrypt('CBBCBB');
// 'BEEBEE'
```

### Options

Options to pass on to _node-fpe_ are:

* `password`: **mandatory**. a secret used in the underlying block cipher.
* `algorithm`: **optional**. the underlying block cipher used. similar to the input to node's [crypto.createCipher()](https://nodejs.org/api/crypto.html#crypto_crypto_createcipher_algorithm_password). **default**: _aes-256-cbc_
* `domain`: **optional**. an array of characters used as the FPE domain. **default**: 0-9 digits
