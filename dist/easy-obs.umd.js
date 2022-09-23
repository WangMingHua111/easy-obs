(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.easyObs = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    function __classPrivateFieldGet(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var hmacSha1 = {exports: {}};

    function commonjsRequire(path) {
    	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
    }

    var core = {exports: {}};

    var hasRequiredCore;

    function requireCore() {
      if (hasRequiredCore) return core.exports;
      hasRequiredCore = 1;

      (function (module, exports) {

        (function (root, factory) {
          {
            // CommonJS
            module.exports = factory();
          }
        })(commonjsGlobal, function () {
          /*globals window, global, require*/

          /**
           * CryptoJS core components.
           */
          var CryptoJS = CryptoJS || function (Math, undefined$1) {
            var crypto; // Native crypto from window (Browser)

            if (typeof window !== 'undefined' && window.crypto) {
              crypto = window.crypto;
            } // Native crypto in web worker (Browser)


            if (typeof self !== 'undefined' && self.crypto) {
              crypto = self.crypto;
            } // Native crypto from worker


            if (typeof globalThis !== 'undefined' && globalThis.crypto) {
              crypto = globalThis.crypto;
            } // Native (experimental IE 11) crypto from window (Browser)


            if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
              crypto = window.msCrypto;
            } // Native crypto from global (NodeJS)


            if (!crypto && typeof commonjsGlobal !== 'undefined' && commonjsGlobal.crypto) {
              crypto = commonjsGlobal.crypto;
            } // Native crypto import via require (NodeJS)


            if (!crypto && typeof commonjsRequire === 'function') {
              try {
                crypto = require('crypto');
              } catch (err) {}
            }
            /*
             * Cryptographically secure pseudorandom number generator
             *
             * As Math.random() is cryptographically not safe to use
             */


            var cryptoSecureRandomInt = function () {
              if (crypto) {
                // Use getRandomValues method (Browser)
                if (typeof crypto.getRandomValues === 'function') {
                  try {
                    return crypto.getRandomValues(new Uint32Array(1))[0];
                  } catch (err) {}
                } // Use randomBytes method (NodeJS)


                if (typeof crypto.randomBytes === 'function') {
                  try {
                    return crypto.randomBytes(4).readInt32LE();
                  } catch (err) {}
                }
              }

              throw new Error('Native crypto module could not be used to get secure random number.');
            };
            /*
             * Local polyfill of Object.create
              */


            var create = Object.create || function () {
              function F() {}

              return function (obj) {
                var subtype;
                F.prototype = obj;
                subtype = new F();
                F.prototype = null;
                return subtype;
              };
            }();
            /**
             * CryptoJS namespace.
             */


            var C = {};
            /**
             * Library namespace.
             */

            var C_lib = C.lib = {};
            /**
             * Base object for prototypal inheritance.
             */

            var Base = C_lib.Base = function () {
              return {
                /**
                 * Creates a new object that inherits from this object.
                 *
                 * @param {Object} overrides Properties to copy into the new object.
                 *
                 * @return {Object} The new object.
                 *
                 * @static
                 *
                 * @example
                 *
                 *     var MyType = CryptoJS.lib.Base.extend({
                 *         field: 'value',
                 *
                 *         method: function () {
                 *         }
                 *     });
                 */
                extend: function (overrides) {
                  // Spawn
                  var subtype = create(this); // Augment

                  if (overrides) {
                    subtype.mixIn(overrides);
                  } // Create default initializer


                  if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
                    subtype.init = function () {
                      subtype.$super.init.apply(this, arguments);
                    };
                  } // Initializer's prototype is the subtype object


                  subtype.init.prototype = subtype; // Reference supertype

                  subtype.$super = this;
                  return subtype;
                },

                /**
                 * Extends this object and runs the init method.
                 * Arguments to create() will be passed to init().
                 *
                 * @return {Object} The new object.
                 *
                 * @static
                 *
                 * @example
                 *
                 *     var instance = MyType.create();
                 */
                create: function () {
                  var instance = this.extend();
                  instance.init.apply(instance, arguments);
                  return instance;
                },

                /**
                 * Initializes a newly created object.
                 * Override this method to add some logic when your objects are created.
                 *
                 * @example
                 *
                 *     var MyType = CryptoJS.lib.Base.extend({
                 *         init: function () {
                 *             // ...
                 *         }
                 *     });
                 */
                init: function () {},

                /**
                 * Copies properties into this object.
                 *
                 * @param {Object} properties The properties to mix in.
                 *
                 * @example
                 *
                 *     MyType.mixIn({
                 *         field: 'value'
                 *     });
                 */
                mixIn: function (properties) {
                  for (var propertyName in properties) {
                    if (properties.hasOwnProperty(propertyName)) {
                      this[propertyName] = properties[propertyName];
                    }
                  } // IE won't copy toString using the loop above


                  if (properties.hasOwnProperty('toString')) {
                    this.toString = properties.toString;
                  }
                },

                /**
                 * Creates a copy of this object.
                 *
                 * @return {Object} The clone.
                 *
                 * @example
                 *
                 *     var clone = instance.clone();
                 */
                clone: function () {
                  return this.init.prototype.extend(this);
                }
              };
            }();
            /**
             * An array of 32-bit words.
             *
             * @property {Array} words The array of 32-bit words.
             * @property {number} sigBytes The number of significant bytes in this word array.
             */


            var WordArray = C_lib.WordArray = Base.extend({
              /**
               * Initializes a newly created word array.
               *
               * @param {Array} words (Optional) An array of 32-bit words.
               * @param {number} sigBytes (Optional) The number of significant bytes in the words.
               *
               * @example
               *
               *     var wordArray = CryptoJS.lib.WordArray.create();
               *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
               *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
               */
              init: function (words, sigBytes) {
                words = this.words = words || [];

                if (sigBytes != undefined$1) {
                  this.sigBytes = sigBytes;
                } else {
                  this.sigBytes = words.length * 4;
                }
              },

              /**
               * Converts this word array to a string.
               *
               * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
               *
               * @return {string} The stringified word array.
               *
               * @example
               *
               *     var string = wordArray + '';
               *     var string = wordArray.toString();
               *     var string = wordArray.toString(CryptoJS.enc.Utf8);
               */
              toString: function (encoder) {
                return (encoder || Hex).stringify(this);
              },

              /**
               * Concatenates a word array to this word array.
               *
               * @param {WordArray} wordArray The word array to append.
               *
               * @return {WordArray} This word array.
               *
               * @example
               *
               *     wordArray1.concat(wordArray2);
               */
              concat: function (wordArray) {
                // Shortcuts
                var thisWords = this.words;
                var thatWords = wordArray.words;
                var thisSigBytes = this.sigBytes;
                var thatSigBytes = wordArray.sigBytes; // Clamp excess bits

                this.clamp(); // Concat

                if (thisSigBytes % 4) {
                  // Copy one byte at a time
                  for (var i = 0; i < thatSigBytes; i++) {
                    var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
                    thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
                  }
                } else {
                  // Copy one word at a time
                  for (var j = 0; j < thatSigBytes; j += 4) {
                    thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
                  }
                }

                this.sigBytes += thatSigBytes; // Chainable

                return this;
              },

              /**
               * Removes insignificant bits.
               *
               * @example
               *
               *     wordArray.clamp();
               */
              clamp: function () {
                // Shortcuts
                var words = this.words;
                var sigBytes = this.sigBytes; // Clamp

                words[sigBytes >>> 2] &= 0xffffffff << 32 - sigBytes % 4 * 8;
                words.length = Math.ceil(sigBytes / 4);
              },

              /**
               * Creates a copy of this word array.
               *
               * @return {WordArray} The clone.
               *
               * @example
               *
               *     var clone = wordArray.clone();
               */
              clone: function () {
                var clone = Base.clone.call(this);
                clone.words = this.words.slice(0);
                return clone;
              },

              /**
               * Creates a word array filled with random bytes.
               *
               * @param {number} nBytes The number of random bytes to generate.
               *
               * @return {WordArray} The random word array.
               *
               * @static
               *
               * @example
               *
               *     var wordArray = CryptoJS.lib.WordArray.random(16);
               */
              random: function (nBytes) {
                var words = [];

                for (var i = 0; i < nBytes; i += 4) {
                  words.push(cryptoSecureRandomInt());
                }

                return new WordArray.init(words, nBytes);
              }
            });
            /**
             * Encoder namespace.
             */

            var C_enc = C.enc = {};
            /**
             * Hex encoding strategy.
             */

            var Hex = C_enc.Hex = {
              /**
               * Converts a word array to a hex string.
               *
               * @param {WordArray} wordArray The word array.
               *
               * @return {string} The hex string.
               *
               * @static
               *
               * @example
               *
               *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
               */
              stringify: function (wordArray) {
                // Shortcuts
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes; // Convert

                var hexChars = [];

                for (var i = 0; i < sigBytes; i++) {
                  var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
                  hexChars.push((bite >>> 4).toString(16));
                  hexChars.push((bite & 0x0f).toString(16));
                }

                return hexChars.join('');
              },

              /**
               * Converts a hex string to a word array.
               *
               * @param {string} hexStr The hex string.
               *
               * @return {WordArray} The word array.
               *
               * @static
               *
               * @example
               *
               *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
               */
              parse: function (hexStr) {
                // Shortcut
                var hexStrLength = hexStr.length; // Convert

                var words = [];

                for (var i = 0; i < hexStrLength; i += 2) {
                  words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
                }

                return new WordArray.init(words, hexStrLength / 2);
              }
            };
            /**
             * Latin1 encoding strategy.
             */

            var Latin1 = C_enc.Latin1 = {
              /**
               * Converts a word array to a Latin1 string.
               *
               * @param {WordArray} wordArray The word array.
               *
               * @return {string} The Latin1 string.
               *
               * @static
               *
               * @example
               *
               *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
               */
              stringify: function (wordArray) {
                // Shortcuts
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes; // Convert

                var latin1Chars = [];

                for (var i = 0; i < sigBytes; i++) {
                  var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
                  latin1Chars.push(String.fromCharCode(bite));
                }

                return latin1Chars.join('');
              },

              /**
               * Converts a Latin1 string to a word array.
               *
               * @param {string} latin1Str The Latin1 string.
               *
               * @return {WordArray} The word array.
               *
               * @static
               *
               * @example
               *
               *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
               */
              parse: function (latin1Str) {
                // Shortcut
                var latin1StrLength = latin1Str.length; // Convert

                var words = [];

                for (var i = 0; i < latin1StrLength; i++) {
                  words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << 24 - i % 4 * 8;
                }

                return new WordArray.init(words, latin1StrLength);
              }
            };
            /**
             * UTF-8 encoding strategy.
             */

            var Utf8 = C_enc.Utf8 = {
              /**
               * Converts a word array to a UTF-8 string.
               *
               * @param {WordArray} wordArray The word array.
               *
               * @return {string} The UTF-8 string.
               *
               * @static
               *
               * @example
               *
               *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
               */
              stringify: function (wordArray) {
                try {
                  return decodeURIComponent(escape(Latin1.stringify(wordArray)));
                } catch (e) {
                  throw new Error('Malformed UTF-8 data');
                }
              },

              /**
               * Converts a UTF-8 string to a word array.
               *
               * @param {string} utf8Str The UTF-8 string.
               *
               * @return {WordArray} The word array.
               *
               * @static
               *
               * @example
               *
               *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
               */
              parse: function (utf8Str) {
                return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
              }
            };
            /**
             * Abstract buffered block algorithm template.
             *
             * The property blockSize must be implemented in a concrete subtype.
             *
             * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
             */

            var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
              /**
               * Resets this block algorithm's data buffer to its initial state.
               *
               * @example
               *
               *     bufferedBlockAlgorithm.reset();
               */
              reset: function () {
                // Initial values
                this._data = new WordArray.init();
                this._nDataBytes = 0;
              },

              /**
               * Adds new data to this block algorithm's buffer.
               *
               * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
               *
               * @example
               *
               *     bufferedBlockAlgorithm._append('data');
               *     bufferedBlockAlgorithm._append(wordArray);
               */
              _append: function (data) {
                // Convert string to WordArray, else assume WordArray already
                if (typeof data == 'string') {
                  data = Utf8.parse(data);
                } // Append


                this._data.concat(data);

                this._nDataBytes += data.sigBytes;
              },

              /**
               * Processes available data blocks.
               *
               * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
               *
               * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
               *
               * @return {WordArray} The processed data.
               *
               * @example
               *
               *     var processedData = bufferedBlockAlgorithm._process();
               *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
               */
              _process: function (doFlush) {
                var processedWords; // Shortcuts

                var data = this._data;
                var dataWords = data.words;
                var dataSigBytes = data.sigBytes;
                var blockSize = this.blockSize;
                var blockSizeBytes = blockSize * 4; // Count blocks ready

                var nBlocksReady = dataSigBytes / blockSizeBytes;

                if (doFlush) {
                  // Round up to include partial blocks
                  nBlocksReady = Math.ceil(nBlocksReady);
                } else {
                  // Round down to include only full blocks,
                  // less the number of blocks that must remain in the buffer
                  nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
                } // Count words ready


                var nWordsReady = nBlocksReady * blockSize; // Count bytes ready

                var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes); // Process blocks

                if (nWordsReady) {
                  for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                    // Perform concrete-algorithm logic
                    this._doProcessBlock(dataWords, offset);
                  } // Remove processed words


                  processedWords = dataWords.splice(0, nWordsReady);
                  data.sigBytes -= nBytesReady;
                } // Return processed words


                return new WordArray.init(processedWords, nBytesReady);
              },

              /**
               * Creates a copy of this object.
               *
               * @return {Object} The clone.
               *
               * @example
               *
               *     var clone = bufferedBlockAlgorithm.clone();
               */
              clone: function () {
                var clone = Base.clone.call(this);
                clone._data = this._data.clone();
                return clone;
              },
              _minBufferSize: 0
            });
            /**
             * Abstract hasher template.
             *
             * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
             */

            C_lib.Hasher = BufferedBlockAlgorithm.extend({
              /**
               * Configuration options.
               */
              cfg: Base.extend(),

              /**
               * Initializes a newly created hasher.
               *
               * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
               *
               * @example
               *
               *     var hasher = CryptoJS.algo.SHA256.create();
               */
              init: function (cfg) {
                // Apply config defaults
                this.cfg = this.cfg.extend(cfg); // Set initial values

                this.reset();
              },

              /**
               * Resets this hasher to its initial state.
               *
               * @example
               *
               *     hasher.reset();
               */
              reset: function () {
                // Reset data buffer
                BufferedBlockAlgorithm.reset.call(this); // Perform concrete-hasher logic

                this._doReset();
              },

              /**
               * Updates this hasher with a message.
               *
               * @param {WordArray|string} messageUpdate The message to append.
               *
               * @return {Hasher} This hasher.
               *
               * @example
               *
               *     hasher.update('message');
               *     hasher.update(wordArray);
               */
              update: function (messageUpdate) {
                // Append
                this._append(messageUpdate); // Update the hash


                this._process(); // Chainable


                return this;
              },

              /**
               * Finalizes the hash computation.
               * Note that the finalize operation is effectively a destructive, read-once operation.
               *
               * @param {WordArray|string} messageUpdate (Optional) A final message update.
               *
               * @return {WordArray} The hash.
               *
               * @example
               *
               *     var hash = hasher.finalize();
               *     var hash = hasher.finalize('message');
               *     var hash = hasher.finalize(wordArray);
               */
              finalize: function (messageUpdate) {
                // Final message update
                if (messageUpdate) {
                  this._append(messageUpdate);
                } // Perform concrete-hasher logic


                var hash = this._doFinalize();

                return hash;
              },
              blockSize: 512 / 32,

              /**
               * Creates a shortcut function to a hasher's object interface.
               *
               * @param {Hasher} hasher The hasher to create a helper for.
               *
               * @return {Function} The shortcut function.
               *
               * @static
               *
               * @example
               *
               *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
               */
              _createHelper: function (hasher) {
                return function (message, cfg) {
                  return new hasher.init(cfg).finalize(message);
                };
              },

              /**
               * Creates a shortcut function to the HMAC's object interface.
               *
               * @param {Hasher} hasher The hasher to use in this HMAC helper.
               *
               * @return {Function} The shortcut function.
               *
               * @static
               *
               * @example
               *
               *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
               */
              _createHmacHelper: function (hasher) {
                return function (message, key) {
                  return new C_algo.HMAC.init(hasher, key).finalize(message);
                };
              }
            });
            /**
             * Algorithm namespace.
             */

            var C_algo = C.algo = {};
            return C;
          }(Math);

          return CryptoJS;
        });
      })(core);

      return core.exports;
    }

    var sha1 = {exports: {}};

    var hasRequiredSha1;

    function requireSha1() {
      if (hasRequiredSha1) return sha1.exports;
      hasRequiredSha1 = 1;

      (function (module, exports) {

        (function (root, factory) {
          {
            // CommonJS
            module.exports = factory(requireCore());
          }
        })(commonjsGlobal, function (CryptoJS) {
          (function () {
            // Shortcuts
            var C = CryptoJS;
            var C_lib = C.lib;
            var WordArray = C_lib.WordArray;
            var Hasher = C_lib.Hasher;
            var C_algo = C.algo; // Reusable object

            var W = [];
            /**
             * SHA-1 hash algorithm.
             */

            var SHA1 = C_algo.SHA1 = Hasher.extend({
              _doReset: function () {
                this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]);
              },
              _doProcessBlock: function (M, offset) {
                // Shortcut
                var H = this._hash.words; // Working variables

                var a = H[0];
                var b = H[1];
                var c = H[2];
                var d = H[3];
                var e = H[4]; // Computation

                for (var i = 0; i < 80; i++) {
                  if (i < 16) {
                    W[i] = M[offset + i] | 0;
                  } else {
                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                    W[i] = n << 1 | n >>> 31;
                  }

                  var t = (a << 5 | a >>> 27) + e + W[i];

                  if (i < 20) {
                    t += (b & c | ~b & d) + 0x5a827999;
                  } else if (i < 40) {
                    t += (b ^ c ^ d) + 0x6ed9eba1;
                  } else if (i < 60) {
                    t += (b & c | b & d | c & d) - 0x70e44324;
                  } else
                    /* if (i < 80) */
                    {
                      t += (b ^ c ^ d) - 0x359d3e2a;
                    }

                  e = d;
                  d = c;
                  c = b << 30 | b >>> 2;
                  b = a;
                  a = t;
                } // Intermediate hash value


                H[0] = H[0] + a | 0;
                H[1] = H[1] + b | 0;
                H[2] = H[2] + c | 0;
                H[3] = H[3] + d | 0;
                H[4] = H[4] + e | 0;
              },
              _doFinalize: function () {
                // Shortcuts
                var data = this._data;
                var dataWords = data.words;
                var nBitsTotal = this._nDataBytes * 8;
                var nBitsLeft = data.sigBytes * 8; // Add padding

                dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
                data.sigBytes = dataWords.length * 4; // Hash final blocks

                this._process(); // Return final computed hash


                return this._hash;
              },
              clone: function () {
                var clone = Hasher.clone.call(this);
                clone._hash = this._hash.clone();
                return clone;
              }
            });
            /**
             * Shortcut function to the hasher's object interface.
             *
             * @param {WordArray|string} message The message to hash.
             *
             * @return {WordArray} The hash.
             *
             * @static
             *
             * @example
             *
             *     var hash = CryptoJS.SHA1('message');
             *     var hash = CryptoJS.SHA1(wordArray);
             */

            C.SHA1 = Hasher._createHelper(SHA1);
            /**
             * Shortcut function to the HMAC's object interface.
             *
             * @param {WordArray|string} message The message to hash.
             * @param {WordArray|string} key The secret key.
             *
             * @return {WordArray} The HMAC.
             *
             * @static
             *
             * @example
             *
             *     var hmac = CryptoJS.HmacSHA1(message, key);
             */

            C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
          })();

          return CryptoJS.SHA1;
        });
      })(sha1);

      return sha1.exports;
    }

    var hmac = {exports: {}};

    var hasRequiredHmac;

    function requireHmac() {
      if (hasRequiredHmac) return hmac.exports;
      hasRequiredHmac = 1;

      (function (module, exports) {

        (function (root, factory) {
          {
            // CommonJS
            module.exports = factory(requireCore());
          }
        })(commonjsGlobal, function (CryptoJS) {
          (function () {
            // Shortcuts
            var C = CryptoJS;
            var C_lib = C.lib;
            var Base = C_lib.Base;
            var C_enc = C.enc;
            var Utf8 = C_enc.Utf8;
            var C_algo = C.algo;
            /**
             * HMAC algorithm.
             */

            C_algo.HMAC = Base.extend({
              /**
               * Initializes a newly created HMAC.
               *
               * @param {Hasher} hasher The hash algorithm to use.
               * @param {WordArray|string} key The secret key.
               *
               * @example
               *
               *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
               */
              init: function (hasher, key) {
                // Init hasher
                hasher = this._hasher = new hasher.init(); // Convert string to WordArray, else assume WordArray already

                if (typeof key == 'string') {
                  key = Utf8.parse(key);
                } // Shortcuts


                var hasherBlockSize = hasher.blockSize;
                var hasherBlockSizeBytes = hasherBlockSize * 4; // Allow arbitrary length keys

                if (key.sigBytes > hasherBlockSizeBytes) {
                  key = hasher.finalize(key);
                } // Clamp excess bits


                key.clamp(); // Clone key for inner and outer pads

                var oKey = this._oKey = key.clone();
                var iKey = this._iKey = key.clone(); // Shortcuts

                var oKeyWords = oKey.words;
                var iKeyWords = iKey.words; // XOR keys with pad constants

                for (var i = 0; i < hasherBlockSize; i++) {
                  oKeyWords[i] ^= 0x5c5c5c5c;
                  iKeyWords[i] ^= 0x36363636;
                }

                oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes; // Set initial values

                this.reset();
              },

              /**
               * Resets this HMAC to its initial state.
               *
               * @example
               *
               *     hmacHasher.reset();
               */
              reset: function () {
                // Shortcut
                var hasher = this._hasher; // Reset

                hasher.reset();
                hasher.update(this._iKey);
              },

              /**
               * Updates this HMAC with a message.
               *
               * @param {WordArray|string} messageUpdate The message to append.
               *
               * @return {HMAC} This HMAC instance.
               *
               * @example
               *
               *     hmacHasher.update('message');
               *     hmacHasher.update(wordArray);
               */
              update: function (messageUpdate) {
                this._hasher.update(messageUpdate); // Chainable


                return this;
              },

              /**
               * Finalizes the HMAC computation.
               * Note that the finalize operation is effectively a destructive, read-once operation.
               *
               * @param {WordArray|string} messageUpdate (Optional) A final message update.
               *
               * @return {WordArray} The HMAC.
               *
               * @example
               *
               *     var hmac = hmacHasher.finalize();
               *     var hmac = hmacHasher.finalize('message');
               *     var hmac = hmacHasher.finalize(wordArray);
               */
              finalize: function (messageUpdate) {
                // Shortcut
                var hasher = this._hasher; // Compute HMAC

                var innerHash = hasher.finalize(messageUpdate);
                hasher.reset();
                var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
                return hmac;
              }
            });
          })();
        });
      })(hmac);

      return hmac.exports;
    }

    (function (module, exports) {

      (function (root, factory, undef) {
        {
          // CommonJS
          module.exports = factory(requireCore(), requireSha1(), requireHmac());
        }
      })(commonjsGlobal, function (CryptoJS) {
        return CryptoJS.HmacSHA1;
      });
    })(hmacSha1);

    var HmacSha1 = hmacSha1.exports;

    var encBase64 = {exports: {}};

    (function (module, exports) {

      (function (root, factory) {
        {
          // CommonJS
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function (CryptoJS) {
        (function () {
          // Shortcuts
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          /**
           * Base64 encoding strategy.
           */

          C_enc.Base64 = {
            /**
             * Converts a word array to a Base64 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The Base64 string.
             *
             * @static
             *
             * @example
             *
             *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
             */
            stringify: function (wordArray) {
              // Shortcuts
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var map = this._map; // Clamp excess bits

              wordArray.clamp(); // Convert

              var base64Chars = [];

              for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
                var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 0xff;
                var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 0xff;
                var triplet = byte1 << 16 | byte2 << 8 | byte3;

                for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                  base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 0x3f));
                }
              } // Add padding


              var paddingChar = map.charAt(64);

              if (paddingChar) {
                while (base64Chars.length % 4) {
                  base64Chars.push(paddingChar);
                }
              }

              return base64Chars.join('');
            },

            /**
             * Converts a Base64 string to a word array.
             *
             * @param {string} base64Str The Base64 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
             */
            parse: function (base64Str) {
              // Shortcuts
              var base64StrLength = base64Str.length;
              var map = this._map;
              var reverseMap = this._reverseMap;

              if (!reverseMap) {
                reverseMap = this._reverseMap = [];

                for (var j = 0; j < map.length; j++) {
                  reverseMap[map.charCodeAt(j)] = j;
                }
              } // Ignore padding


              var paddingChar = map.charAt(64);

              if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);

                if (paddingIndex !== -1) {
                  base64StrLength = paddingIndex;
                }
              } // Convert


              return parseLoop(base64Str, base64StrLength, reverseMap);
            },
            _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
          };

          function parseLoop(base64Str, base64StrLength, reverseMap) {
            var words = [];
            var nBytes = 0;

            for (var i = 0; i < base64StrLength; i++) {
              if (i % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
                var bitsCombined = bits1 | bits2;
                words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
                nBytes++;
              }
            }

            return WordArray.create(words, nBytes);
          }
        })();

        return CryptoJS.enc.Base64;
      });
    })(encBase64);

    var EncBase64 = encBase64.exports;

    var _ObsUploader_options;
    /**
     * 生成指定位数的GUID，无【-】格式
     * @param digit 位数，默认值8
     * @returns
     */
    function guid(digit = 16) {
        return 'x'.repeat(digit).replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    /**
     * 华为云 obs 上传器
     */
    class ObsUploader {
        constructor(options) {
            this.version = '3.0';
            _ObsUploader_options.set(this, void 0);
            if (typeof options === 'undefined')
                throw new Error('ObsUploaderOptions是必须的');
            if (typeof options.ak === 'undefined')
                throw new Error('Ak是必须的');
            if (typeof options.sk === 'undefined')
                throw new Error('Sk是必须的');
            if (typeof options.bucket === 'undefined')
                throw new Error('Bucket是必须的');
            if (typeof options.endpoint === 'undefined')
                throw new Error('Endpoint是必须的');
            __classPrivateFieldSet(this, _ObsUploader_options, options, "f");
        }
        /**
         * 克隆当前上传对象实例
         * @param options 覆盖配置选项
         * @returns
         */
        clone(options) {
            return new ObsUploader(Object.assign({}, __classPrivateFieldGet(this, _ObsUploader_options, "f"), options));
        }
        async upload(file, opts) {
            var _a;
            const d = new Date();
            const { resource, log, progress } = Object.assign({ resource: (f, suffix = '') => `/${d.getFullYear()}-${d.getMonth().toString().padStart(2, '0')}-${d.getDay().toString().padStart(2, '0')}/${guid()}${suffix}` }, opts);
            const suffix = (_a = file.name.match(/\.\w+$/)) === null || _a === void 0 ? void 0 : _a[0];
            const objectURL = resource(file, suffix);
            const { ak, sk, bucket, endpoint, protocol = 'https' } = __classPrivateFieldGet(this, _ObsUploader_options, "f");
            const AK = ak instanceof Promise ? await ak : ak;
            const SK = sk instanceof Promise ? await sk : sk;
            const BucketName = bucket instanceof Promise ? await bucket : bucket;
            const Endpoint = endpoint instanceof Promise ? await endpoint : endpoint;
            const { type } = file;
            // 排序对象key的函数
            const sort_object = (obj) => {
                return Object.keys(obj).sort().reduce((result, key) => {
                    result[key] = obj[key];
                    return result;
                }, {});
            };
            /**
             *
             1. 计算StringToSign:
                    
            StringToSign = HTTP-Verb + "\n" +
            Content-MD5 + "\n" +
            Content-Type + "\n" +
            Date + "\n" +
            CanonicalizedHeaders +
            CanonicalizedResource
             */
            const HTTPVerb = 'PUT';
            const ContentMD5 = '';
            const ContentType = type;
            const DateStr = new Date().toUTCString();
            const CanonicalizedHeaders = sort_object([
                ['x-obs-date', DateStr],
            ].reduce((result, header) => {
                result[header[0]] = header[1];
                return result;
            }, {}));
            const CanonicalizedResource = `/${bucket}/${objectURL}`.replace(/\/+/g, '/');
            const StringToSign = [
                HTTPVerb, ContentMD5, ContentType, '',
                Object.keys(CanonicalizedHeaders).map(key => `${key}:${CanonicalizedHeaders[key]}`).join('\n'),
                CanonicalizedResource
            ].join('\n');
            /**
             2. 计算Signature:
                    
            Signature =
            Base64(Hmac-sha1(SK, StringToSign))
             */
            const Signature = HmacSha1(StringToSign, SK).toString(EncBase64);
            /**
             3. 计算Authorization
          
            Authorization = "OBS " + AK + ":" + Signature
             */
            const Authorization = `OBS ${AK}:${Signature}`;
            log === null || log === void 0 ? void 0 : log('AK', AK);
            log === null || log === void 0 ? void 0 : log('BucketName', BucketName);
            log === null || log === void 0 ? void 0 : log('Endpoint', Endpoint);
            log === null || log === void 0 ? void 0 : log('HTTPVerb', HTTPVerb);
            log === null || log === void 0 ? void 0 : log('ContentMD5', ContentMD5);
            log === null || log === void 0 ? void 0 : log('ContentType', ContentType);
            log === null || log === void 0 ? void 0 : log('CanonicalizedHeaders', CanonicalizedHeaders);
            log === null || log === void 0 ? void 0 : log('CanonicalizedResource', CanonicalizedResource);
            log === null || log === void 0 ? void 0 : log('StringToSign', StringToSign);
            log === null || log === void 0 ? void 0 : log('Authorization', Authorization);
            // 执行文件上传
            const AccessPath = `${protocol}://${BucketName}.${Endpoint}${('/' + objectURL).replace(/\/+/g, '/')}`;
            log === null || log === void 0 ? void 0 : log('AccessPath', AccessPath);
            // await fetch(AccessPath, {
            //   method: HTTPVerb,
            //   headers: {
            //     Authorization,
            //     'Content-Type': ContentType,
            //     ...CanonicalizedHeaders
            //   },
            //   body: file,
            // })
            await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open("put", AccessPath);
                xhr.setRequestHeader("Authorization", Authorization);
                xhr.setRequestHeader("Content-Type", ContentType);
                Object.keys(CanonicalizedHeaders).forEach(key => xhr.setRequestHeader(key, CanonicalizedHeaders[key]));
                xhr.upload.onprogress = (event) => {
                    // 回调上传进度
                    progress === null || progress === void 0 ? void 0 : progress(event);
                };
                xhr.onerror = () => {
                    reject("上传失败！");
                };
                xhr.onabort = () => {
                    reject("已取消上传");
                };
                xhr.upload.onabort = () => {
                    reject("已取消上传");
                };
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve();
                    }
                };
                xhr.send(file);
            }).catch((e) => {
                throw new Error(e);
            });
            return AccessPath;
        }
    }
    _ObsUploader_options = new WeakMap();

    exports.ObsUploader = ObsUploader;
    exports["default"] = ObsUploader;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
