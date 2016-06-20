const test = require('tape');
const checkURIs = require('check-uri');

test('compare URIs', (tape) => {
  tape.equal(checkURIs('http://abc.com:80/~smith/home.html', 'http://ABC.com/%7Esmith/home.html'), true)
  tape.equal(checkURIs('http://abc.com/drill/down/foo.html', 'http://abc.com/drill/further/../down/./foo.html'), true)
  tape.equal(checkURIs('http://abc.com/foo.html?a=1&b=2', 'http://abc.com/foo.html?b=2&a=1'), true)
  tape.equal(checkURIs('http://abc.com/foo.html?a=1&b=2&a=3', 'http://abc.com/foo.html?a=3&a=1&b=2'), false)
  tape.end()
});
