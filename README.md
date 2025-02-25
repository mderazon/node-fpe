# node-fpe

[![Build status](https://github.com/mderazon/node-fpe/actions/workflows/node.js.yml/badge.svg)](https://github.com/mderazon/node-fpe/actions) [![npm Version](https://badge.fury.io/js/node-fpe.svg)](https://badge.fury.io/js/node-fpe) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Format preserving string substitution encryption

In general, [format-preserving encryption](https://en.wikipedia.org/wiki/Format-preserving_encryption) is a type of encryption such that the output (the ciphertext) is in the same format as the input (the plaintext).

This library uses a simple [substitution cipher](https://en.wikipedia.org/wiki/Substitution_cipher) algorithm. Read more about the security of this library in the dedicated section below.

## Usage

### Example:

cipher with default domain ([0-9])

```js
import fpe from 'node-fpe';
const cipher = fpe({ secret: 'secret!' });

cipher.encrypt('1234567');
// '7130548'

cipher.decrypt('7130548');
// '1234567'
```

cipher with a custom domain ([A-E])

```js
import fpe from 'node-fpe';
const cipher = fpe({ secret: 'secret!', domain: ['A', 'B', 'C', 'D', 'E'] });

cipher.encrypt('BEEBEE');
// 'ABBABB'

cipher.decrypt('ABBABB');
// 'BEEBEE'
```

### Options

Options to pass on to _node-fpe_ are:

- `secret`: **mandatory**. a secret used in the underlying hash function.
- `domain`: **optional**. an array of characters used as the FPE domain. **default**: 0-9 digits

## Security

This module is using the term _format-preserving encryption_, however it is **not** a proper fpe implementation. It is basically a [substitution cipher](https://en.wikipedia.org/wiki/Substitution_cipher), you can use it to scramble and de-scramble strings but it is **not recommended to use it with anything sensitive** as the encryption is weak.

For fpe, there are other libraries available:

- https://github.com/eCollect/node-fe1-fpe
