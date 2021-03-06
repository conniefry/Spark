/**
 * Imports test.
 * Verifies which modules can be imported (ws, url, querystring, htmlparser, http, https, crypto, oauth, http2)
 * and which cannot be (events, fs, os, net).
 */

px.import({
  scene: 'px:scene.1.js',
  assert: '../test-run/assert.js',
  manual: '../test-run/tools_manualTests.js'
})
.then(function(imports) {

  var scene = imports.scene;
  var root = imports.scene.root;
  var assert = imports.assert.assert;
  var manual = imports.manual;
  var manualTest = manual.getManualTestValue();
  var basePath = px.getPackageBaseFilePath() + '/import/test_import.js';

  module.exports.beforeStart = function() {
    return new Promise(function(resolve, reject) {
      if (scene && root && assert && basePath) {
        resolve();
      } else {
        reject();
      }
    });
  };

  function test_arrays_equal(a1, a2) {
    return function () {
      var diff1 = a1.filter(function (v) { return -1 === a2.indexOf(v); });
      var diff2 = a2.filter(function (v) { return -1 === a1.indexOf(v); });
      var diff = diff1.concat(diff2);
      return Promise.resolve(assert(diff1.length === 0, 'api differs: ' + diff));
    };
  }

  function test_api(module, expectedApi) {
    return function () {
      if (!module) {
        return Promise.resolve(assert(false, 'module is null'));
      } else {
        var reapApi = [], key;
        for (key in module) {
          reapApi.push(key);
        }
        return test_arrays_equal(expectedApi, reapApi)();
      }
    };
  }

  function test_module(name, expectedApi) {
    return function () {
      return new Promise(function (resolve) {
        scene.create({t:'scene', parent:root, url:basePath+'?module='+name})
        .ready.then(function(js)  {
          if (!js || !js.api || !js.api.ready || !js.api.ready.then) {
            resolve(assert(false, 'px.import did not return a promise'));
          } else {
            js.api.ready.then(function (module) {
              test_api(module, expectedApi)().then(resolve);
            }, function () {
              resolve(assert(typeof expectedApi === 'undefined', 'px.import promise failed'));
            });
          }
        }, function () {
          resolve(assert(typeof expectedApi === 'undefined', 'px.import failed'));
        });
      })
    };
  }

  module.exports.tests = {
    events: test_module('events'),
    fs: test_module('fs'),
    os: test_module('os'),
    net: test_module('net'),
    ws: test_module('ws',
      [ ]),
    url: test_module('url',
      [ 'Url', 'parse', 'resolve', 'resolveObject', 'format' ]),
    querystring: test_module('querystring',
      [ 'unescapeBuffer',
        'unescape',
        'escape',
        'stringify',
        'encode',
        'parse',
        'decode' ]),
    htmlparser: test_module('htmlparser',
      [ 'Parser', 'DefaultHandler', 'RssHandler', 'ElementType', 'DomUtils' ]),
    http: test_module('http',
      [ 'request', 'get', 'Agent' ]),
    https: test_module('https',
      [ 'request', 'get', 'Agent' ]),
    crypto: test_module('crypto',
      [ 'createCipheriv',
        'createDecipheriv',
        'createDiffieHellman',
        'createDiffieHellmanGroup',
        'createECDH',
        'createHash',
        'createHmac',
        'createSign',
        'createVerify',
        'getCiphers',
        'getCurves',
        'getDiffieHellman',
        'getHashes',
        'pbkdf2',
        'pbkdf2Sync',
        'privateDecrypt',
        'privateEncrypt',
        'publicDecrypt',
        'publicEncrypt',
        'randomBytes',
        'setEngine',
        'timingSafeEqual',
        'Certificate',
        'Cipher',
        'Cipheriv',
        'Decipher',
        'Decipheriv',
        'DiffieHellman',
        'DiffieHellmanGroup',
        'Hash',
        'Hmac',
        'Sign',
        'Verify',
        'DEFAULT_ENCODING',
        'constants' ]),
    oauth: test_module('oauth',
      [ 'OAuth', 'OAuthEcho', 'OAuth2' ]),
    http2: test_module('http2',
      [ 'request', 'get', 'Agent' ])
  };

  if (manualTest === true) {
    manual.runTestsManually(
      module.exports.tests,
      module.exports.beforeStart);
  }

}).catch(function(err){
  console.error("Import failed: " + err);
});
