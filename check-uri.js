const parseURI = (uri) => {
  //decode uri and lower case it
  let str = decodeURIComponent(uri);
  //protocol, auth, hostname, port, pathname, search, hash
  let parts = {};
  let pos;

  //start from easiest part
  //extract hash
  pos = str.indexOf('#');
  if (pos > -1) {
    parts.hash = str.substring(pos + 1);
    str = str.substring(0, pos);
  }

  //extract querystring
  pos = str.indexOf('?');
  if (pos > -1) {
    const querystring = str.substring(pos + 1);
    const obj = {};
    const splitStrings = querystring.split('&');
    for (let i = 0, len = splitStrings.length; i < len; i++) {
      const item = splitStrings[i].split('=');
      obj[item[0]] = decodeURIComponent(item[1]);
    }
    parts.querystring = obj;
    str = str.substring(0, pos);
  }

  //extract protocol
  pos = str.indexOf(':');
  if (pos > -1) {
    parts.protocol = str.substring(0, pos).toLowerCase();
    str = str.substring(pos + 1, pos.length);
  }

  //remove double slash
  pos = str.indexOf('//');
  if (pos > -1) {
    str = str.substring(2, str.length);
  }

  //extract username & password
  pos = str.indexOf('@');
  if (pos > -1) {
    parts.auth = str.substring(0, pos);
    str = str.substring(pos + 1, pos.length); //remove @
  }

  //extract host
  pos = str.indexOf(':'); //if port is present
  if (pos > -1) {
    parts.host = str.substring(0, pos).toLowerCase();
    str = str.substring(pos + 1, pos.length);
  } else {
    pos = str.indexOf('/');
    parts.host = str.substring(0, pos).toLowerCase();
    str = str.substring(pos, pos.length);
  }

  //extract port
  pos = str.indexOf('/');
  if (pos > -1) {
    //try to parse int
    let port = parseInt(str.substring(0, pos));
    if (isNaN(port)) {
      port = 80;
      str
    } else {
      str = str.substring(pos, pos.length);
    }

    parts.port = port;
  }

  //extract path
  str = str.replace('../', '');
  str = str.replace('./', '');
  parts.path = str;

  return parts;
}

const checkURIs = (uri1, uri2) => {
  const test1 = parseURI(uri1);
  const test2 = parseURI(uri2);

  const uribreak1 = test1.path.split('/');
  const uribreak2 = test2.path.split('/');

  //compare path
  if (uribreak1[1] !== uribreak2[1]) {
    return false;
  }

  if (uribreak1[uribreak1.length - 1] !== uribreak2[uribreak2.length - 1]) {
    return false;
  }

  //compare hash
  if (test1.hash !== test2.hash) {
    return false;
  }

  //compare querystring
  if (test1.querystring && test2.querystring) {
    const query1 = test1.querystring;
    const query2 = test2.querystring;

    if (query1.length !== query2.length) {
      return false;
    }

    for(let i in query1) {
      if (query1.hasOwnProperty(i)) {
        if (query1[i] !== query2[i]) {
          return false;
        }
      }
    }

    for(let i in query2) {
      if (query2.hasOwnProperty(i)) {
        if (query1[i] !== query2[i]) {
          return false;
        }
      }
    }

  }

  //compare protocol
  if (test1.protocol !== test2.protocol) {
    return false;
  }

  //compare auth
  if (test1.auth !== test2.auth) {
    return false;
  }

  //compare host
  if (test1.host !== test2.host) {
    return false;
  }

  return true;
};

module.exports = checkURIs;
