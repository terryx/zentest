const test = require('tape');
const compress = require('compress');

test('string compress', (tape) => {
  tape.equal(compress('aaaabbaaaababbbcccccccccccc'), 'a4b2a4b1a1b3c12')
  tape.equal(compress('aaabbaaaababbbccccddcccccccc'), 'a3b2a4b1a1b3c4d2c8')
  tape.equal(compress('aaazzc'), 'a3z2c1')
  tape.equal(compress('hhhxxxopo'), 'h3x3o1p1o1')
  tape.equal(compress('naancheese'), 'n1a2n1c1h1e2s1e1')
  tape.equal(compress('NaNNaNNanBatman'), 'n1a1n2a1n2a1n1b1a1t1m1a1n1')
  tape.notEqual('whaaat', 'wh1a2t')
  tape.end()
});
