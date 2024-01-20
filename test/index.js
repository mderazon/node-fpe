const test = require('node:test');
const assert = require('node:assert/strict');
const fpe = require('../lib');

test('missing secret', (t) => {
  assert.throws(() => fpe());
});

test('encrypt-decrypt', (t) => {
  const cipher = fpe({ secret: 'secret' });
  assert.strictEqual(cipher.decrypt(cipher.encrypt('12345')), '12345');
});

test('different secrets', (t) => {
  const cipher1 = fpe({ secret: 'secret' });
  const cipher2 = fpe({ secret: 'other secret' });
  assert.notStrictEqual(cipher1.encrypt('12345'), cipher2.encrypt('12345'));
});

test('ascii domain', (t) => {
  var ascii =
    ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'.split(
      '',
    );
  const cipher = fpe({ secret: 'secret', domain: ascii });
  console.log(cipher.encrypt('ABBA'));
  assert.strictEqual(cipher.decrypt(cipher.encrypt('ABBA')), 'ABBA');
});

test('different domain', (t) => {
  const cipher = fpe({ secret: 'secret', domain: ['A', 'B', 'C', 'D', 'E'] });
  assert.strictEqual(cipher.decrypt(cipher.encrypt('ABBA')), 'ABBA');
});

test('characters not in domain', (t) => {
  const cipher = fpe({ secret: 'secret', domain: ['A', 'B', 'C', 'D', 'E'] });
  assert.throws(() => cipher.encrypt('ABF'));
  assert.throws(() => cipher.decrypt('ABF'));
});

test('input not a string', (t) => {
  const cipher = fpe({ secret: 'secret' });
  assert.throws(() => cipher.encrypt(123));
  assert.throws(() => cipher.decrypt(123));
});
