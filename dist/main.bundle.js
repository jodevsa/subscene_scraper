module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lang = __webpack_require__(3);

var _lang2 = _interopRequireDefault(_lang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @description responsible of generating request options.
 * @param {string} URL - HTTP URL.
 * @param {string} lang - Subtitle language.
 * @param {string} method - HTTP METHOD (GET/HEAD/POST/PUT).
 * @param {string} body - HTTP request body.
 * @param {boolean} followRedirect - to follow redirects or not (true/false)
   @return {Promise.<Object>}
 */
function genHttpOptions(URL, lang, method, body, followRedirect) {
    var settings = Object.seal({
        followRedirect: false,
        method: 'GET',
        url: '',
        body: '',
        encoding: 'utf-8',
        gzip: true,
        headers: {
            'User-Agent': 'Mozilla/5.0',
            'Cookie': 'LanguageFilter='
        }
    });
    settings.url = URL;
    settings.followRedirect = followRedirect || false;
    settings.method = method || 'GET';
    settings.headers.Cookie += (0, _lang2.default)(lang) || '13';
    settings.body = body || '';
    debugger;
    return settings;
}

exports.default = genHttpOptions;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/** @description wrapper around a promisifed request function that retries.
 * @param {Object} options - request optipons.
   @return {Respones}
*/
var req = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
    var response, i;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return reqP(options);

          case 2:
            response = _context.sent;
            i = 0;

          case 4:
            if (!(response.statusCode === blockCode && i < retry)) {
              _context.next = 13;
              break;
            }

            _context.next = 7;
            return sleep(sleeptime);

          case 7:
            _context.next = 9;
            return reqP(options);

          case 9:
            response = _context.sent;

            i += 1;
            _context.next = 4;
            break;

          case 13:
            if (!(response.statusCode === blockCode)) {
              _context.next = 15;
              break;
            }

            return _context.abrupt('return', Promise.reject(new Error('script got blocked 409 resCode')));

          case 15:
            return _context.abrupt('return', response);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function req(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _util = __webpack_require__(10);

var _request = __webpack_require__(11);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var reqP = (0, _util.promisify)(_request2.default);
var retry = 3;
var blockCode = 409;
var sleeptime = 800;

/** @description sleep//setTimeout.
 * @param {string} seconds - number of seconds to sleep.
   @return {Respones}
*/
function sleep(seconds) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(seconds);
    }, seconds);
  });
}exports.default = req;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var languageSet = Object.freeze({
    'arabic': '2',
    'brazillianportuguese': '4',
    'danish': '10',
    'dutch': '11',
    'english': '13',
    'farsi/persian': '46',
    'finnish': '17',
    'french': '18',
    'hebrew': '22',
    'indonesian': '44',
    'italian': '26',
    'norwegian': '30',
    'romanian': '33',
    'spanish': '38',
    'swedish': '39',
    'vietnamese': '45',
    'albanian': '1',
    'armenian': '73',
    'azerbaijani': '55',
    'basque': '74',
    'belarusian': '68',
    'bengali': '54',
    'big5 code': '3',
    'bosnian': '60',
    'bulgarian': '5',
    'bulgarian/english': '6',
    'burmese': '61',
    'catalan': '49',
    'chinesebg code': '7',
    'croatian': '8',
    'czech': '9',
    'dutch/english': '12',
    'english/german': '15',
    'esperanto': '47',
    'estonian': '16',
    'georgian': '62',
    'german': '19',
    'greek': '21',
    'greenlandic': '57',
    'hindi': '51',
    'hungarian': '23',
    'hungarian/english': '24',
    'icelandic': '25',
    'japanese': '27',
    'korean': '28',
    'kurdish': '52',
    'latvian': '29',
    'lithuanian': '43',
    'macedonian': '48',
    'malay': '50',
    'malayalam': '64',
    'manipuri': '65',
    'mongolian': '72',
    'pashto': '67',
    'polish': '31',
    'portuguese': '32',
    'punjabi': '66',
    'russian': '34',
    'serbian': '35',
    'sinhala': '58',
    'slovak': '36',
    'slovenian': '37',
    'somali': '70',
    'tagalog': '53',
    'tamil': '59',
    'telugu': '63',
    'thai': '40',
    'turkish': '41',
    'urdu': '42',
    'ukrainian': '56'
});

/** @description map string language with it's subscene langCode.
 * @param {string} lang - location to save file.
   @return {boolean}
 */
function getLanguageCode(lang) {
    var l = lang.toLowerCase().trim();
    if (languageSet[l] != undefined) {
        return languageSet[l];
    } else {
        return false;
    }
}

exports.default = getLanguageCode;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExactTitleList = exports.getExactTitlePassive = exports.getTitleSubtitles = undefined;

/** @description responsible of choosing first title movie! when in passive
     mode.
  * @param {string} movieList - pack
    @return {string}
  */
/** @description responsible of handling movie subtitles of type title.
  * @param {string} data - pack
  * @param {string} passive - pack
    @return {Promise.<Array>}
  */
var getExactTitleList = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    var _ref2, movieList;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getTitles(data);

          case 2:
            _ref2 = _context.sent;
            movieList = _ref2.movies;
            return _context.abrupt('return', movieList);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getExactTitleList(_x) {
    return _ref.apply(this, arguments);
  };
}();
/** @description responsible of handling movie subtitles of type title.
 * @param {string} data - pack
 * @param {string} passive - pack
   @return {Promise.<Array>}
 */


var getExactTitlePassive = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {
    var _ref4, movieList, language, result;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getTitles(data);

          case 2:
            _ref4 = _context2.sent;
            movieList = _ref4.movies;
            language = _ref4.lang;
            result = chooseTitleMoviePassive(movieList);
            _context2.next = 8;
            return getTitleSubLink({ lang: language, result: result });

          case 8:
            return _context2.abrupt('return', _context2.sent);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getExactTitlePassive(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

/** @description responsible of handling movie subtitles of type title.
 * @param {string} data - pack
   @return {Array}
 */


var getTitleSubtitles = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
    var url, lang, op, response, $, subtitles, lastLink;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = data.url;
            lang = data.lang;
            op = (0, _http_options2.default)(url, lang, 'GET');
            _context3.next = 5;
            return (0, _req2.default)(op);

          case 5:
            response = _context3.sent;
            $ = _cheerio2.default.load(response.body);
            subtitles = [];
            lastLink = $('table').eq(0).children('tbody').children('tr').children('td.a1');

            lastLink.map(function (index, val) {
              var releaseUrl = $(val).children('a').attr('href');
              var releaseName = $(val).children('a').children('span').eq(1).text().trim();
              subtitles.push({
                url: domain + releaseUrl,
                name: releaseName
              });
            });
            return _context3.abrupt('return', subtitles);

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getTitleSubtitles(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

/** @description responsible of handling movie subtitles of type title.
 * @param {string} data - pack
   @return {Promise.<Array>}
 */


var getTitles = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {
    var language, $, movieTitleList;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            //  Exact>close>popular>tv-series
            language = data.lang;
            $ = _cheerio2.default.load(data.body);
            movieTitleList = {};

            $('div .search-result').children('h2').map(function (n, element) {
              var header = $(element).text();
              movieTitleList[header] = [];
              $(element).next().children('li').map(function (n, value) {
                $(value).children('div .title').children('a').map(function (n, Movie) {
                  var val = {
                    name: $(Movie).text(),
                    link: domain + $(Movie).attr('href')
                  };

                  movieTitleList[header].push(val);
                });
              });
            });

            return _context4.abrupt('return', { movies: movieTitleList, lang: language });

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getTitles(_x4) {
    return _ref6.apply(this, arguments);
  };
}();

var _cheerio = __webpack_require__(0);

var _cheerio2 = _interopRequireDefault(_cheerio);

var _http_options = __webpack_require__(1);

var _http_options2 = _interopRequireDefault(_http_options);

var _req = __webpack_require__(2);

var _req2 = _interopRequireDefault(_req);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var domain = 'https://subscene.com';
var TitleOptions = ['Exact', 'Close', 'Popular', 'TV-Series'];

/** @description responsible of choosing first title movie! when in passive
    mode.
 * @param {string} movieList - pack
   @return {string}
 */
function chooseTitleMoviePassive(movieList) {
  var i = 0;
  for (var movieType in movieList) {
    if (TitleOptions[i] === movieType) {
      return domain + movieList[movieType][0].link;
    }
    i += 1;
  }
};

exports.getTitleSubtitles = getTitleSubtitles;
exports.getExactTitlePassive = getExactTitlePassive;
exports.getExactTitleList = getExactTitleList;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(7);
module.exports = __webpack_require__(8);


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMovieSubtitleDetails = exports.getTitleSubtitles = exports.downloadReleaseSubtitle = exports.passiveDownloader = undefined;

/**
 * @typedef MovieTypeData
 * @property {string} type type of movie (title/release).
 * @property {string} lang language needed for the movie subtitle.
 * @property {string} body html response of search request.
 */
/** @description Detirmines movies type (title/release).
 * @param {string} filename - the name of the movie.
 * @param {string} lang - the language desired
   @return {Promise.<MovieTypeData>}
 */
var determineMovieNameType = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(filename, lang) {
    var langCode, url, reqOptions, response, type;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            langCode = (0, _lang2.default)(lang);

            if (langCode) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', Promise.reject(new Error('language not supported!')));

          case 3:
            url = domain + '/subtitles/title?q=' + encodeURIComponent(filename);
            reqOptions = (0, _http_options2.default)(url, lang, 'GET', '', true);
            _context.next = 7;
            return (0, _req2.default)(reqOptions);

          case 7:
            response = _context.sent;
            type = response.request._redirect.redirects.length === 0 ? 'title' : 'release';
            return _context.abrupt('return', { '_name': filename,
              'type': type,
              'lang': langCode,
              'body': response.body });

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function determineMovieNameType(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/** @description extract subtitle's download link.
 * @param {string} URL - the name of the movie.
   @return {Promise.<string>}
 */
var getSubtitleDownloadLink = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(URL) {
    var url, response, $, downloadLink;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // until we apply this to handleTitle
            // it will always be an array.
            url = Array.isArray(URL) ? URL[0] : URL;
            _context2.next = 3;
            return (0, _req2.default)((0, _http_options2.default)(url, 'GET', ''));

          case 3:
            response = _context2.sent;
            $ = _cheerio2.default.load(response.body);
            downloadLink = domain + $('.download a').attr('href');
            return _context2.abrupt('return', downloadLink);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getSubtitleDownloadLink(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

/** @description main function.
 * @param {string} movieName - the name of the movie.
 * @param {string} language - the name of the movie.
 * @param {string} path - the name of the movie.
   @return {Promise.<string>}
 */


var getMovieSubtitleDetails = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(movieName, language) {
    var movieInfo, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return determineMovieNameType(movieName, language);

          case 2:
            movieInfo = _context3.sent;
            _context3.next = 5;
            return (0, _handle_type2.default)(movieInfo);

          case 5:
            result = _context3.sent;
            return _context3.abrupt('return', {
              type: movieInfo.type,
              result: result
            });

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getMovieSubtitleDetails(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

/** @description download's subtitle passivly, choose's first subtitle found.
* @param {string} movieName - the name of the movie.
* @param {string} lang - the name of the movie.
* @param {string} path - the name of the movie.
  @return {Promise.<string>}
*/


var passiveDownloader = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(movieName, lang, path) {
    var language, movieInfo, movieURL, list, releaseURL, result, _releaseURL, _result;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            language = lang || 'english';
            _context4.next = 3;
            return getMovieSubtitleDetails(movieName, language);

          case 3:
            movieInfo = _context4.sent;

            if (!(movieInfo.type === 'title')) {
              _context4.next = 16;
              break;
            }

            movieURL = chooseTitleMoviePassive(movieInfo.result);
            _context4.next = 8;
            return (0, _handle_title.getTitleSubtitles)({ url: movieURL, lang: language });

          case 8:
            list = _context4.sent;
            releaseURL = list[0].url;
            _context4.next = 12;
            return downloadReleaseSubtitle(releaseURL, path);

          case 12:
            result = _context4.sent;
            return _context4.abrupt('return', result);

          case 16:
            _releaseURL = movieInfo.result[0].url;
            _context4.next = 19;
            return downloadReleaseSubtitle(_releaseURL, path);

          case 19:
            _result = _context4.sent;
            return _context4.abrupt('return', _result);

          case 21:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function passiveDownloader(_x6, _x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/** @description download's and save's subtitle of releaseURL.
* @param {string} releaseURL - url of release.
* @param {string} location - location to save.
  @return {Object}
*/


var downloadReleaseSubtitle = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(releaseURL, location) {
    var downloadLink, file, unPackedFile;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getSubtitleDownloadLink(releaseURL);

          case 2:
            downloadLink = _context5.sent;
            _context5.next = 5;
            return (0, _download_subtitle2.default)(downloadLink);

          case 5:
            file = _context5.sent;
            _context5.next = 8;
            return (0, _unzip_sub_buffer2.default)(file);

          case 8:
            unPackedFile = _context5.sent;
            _context5.next = 11;
            return (0, _save_subtitle2.default)(location || '.', unPackedFile);

          case 11:
            return _context5.abrupt('return', _context5.sent);

          case 12:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function downloadReleaseSubtitle(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var _cheerio = __webpack_require__(0);

var _cheerio2 = _interopRequireDefault(_cheerio);

var _http_options = __webpack_require__(1);

var _http_options2 = _interopRequireDefault(_http_options);

var _handle_type = __webpack_require__(9);

var _handle_type2 = _interopRequireDefault(_handle_type);

var _download_subtitle = __webpack_require__(13);

var _download_subtitle2 = _interopRequireDefault(_download_subtitle);

var _unzip_sub_buffer = __webpack_require__(14);

var _unzip_sub_buffer2 = _interopRequireDefault(_unzip_sub_buffer);

var _save_subtitle = __webpack_require__(16);

var _save_subtitle2 = _interopRequireDefault(_save_subtitle);

var _lang = __webpack_require__(3);

var _lang2 = _interopRequireDefault(_lang);

var _req = __webpack_require__(2);

var _req2 = _interopRequireDefault(_req);

var _handle_title = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var domain = 'https://subscene.com/';
var TitleOptions = Object.freeze(['Exact', 'Close', 'Popular', 'TV-Series']);;

/** @description return's the first title in the available options
  [exact,close,popular,tv-series].
 * @param {string} movieList - the name of the movie.
   @return {String}
 */
function chooseTitleMoviePassive(movieList) {
  var i = 0;
  for (var movieType in movieList) {
    if (TitleOptions[i] === movieType) {
      return movieList[movieType][0].link;
    }
    i += 1;
  }
}exports.passiveDownloader = passiveDownloader;
exports.downloadReleaseSubtitle = downloadReleaseSubtitle;
exports.getTitleSubtitles = _handle_title.getTitleSubtitles;
exports.getMovieSubtitleDetails = getMovieSubtitleDetails;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @typedef MovieTypeData
 * @property {string} type type of movie (title/release).
 * @property {string} lang language needed for the movie subtitle.
 * @property {string} body html response of search request.
 */
/** @description handle's movies type (title/release).
 * @param {MovieTypeData} data
  * @param {MovieTypeData} isPassive
   @return {handleRelease|handleTitle}
 */
var handleType = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data, isPassive) {
    var handleTitle, handler;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            handleTitle = isPassive ? _handle_title.getExactTitlePassive : _handle_title.getExactTitleList;
            handler = data.type === 'release' ? _handle_release2.default : handleTitle;
            return _context.abrupt('return', handler(data));

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function handleType(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _handle_title = __webpack_require__(4);

var _handle_release = __webpack_require__(12);

var _handle_release2 = _interopRequireDefault(_handle_release);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = handleType;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cheerio = __webpack_require__(0);

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var domain = 'https://subscene.com';

/** @description responsible of handling movie subtitles of type release.
 * @param {string} data - pack
   @return {Promise.<Array>}
 */
function handleRelease(data) {
  var $ = _cheerio2.default.load(data.body);
  var releaseTable = $('table tbody tr');
  var releaseLinks = Array.prototype.slice.call(releaseTable.map(function (index, value) {
    var path = $(value).children('.a1').children('a').eq(0).attr('href');
    var name = $(value).children('.a1').children('a').eq(0).children('span').eq(1).text().trim();
    return {
      name: name,
      url: domain + path
    };
  }));
  return releaseLinks;
}

exports.default = handleRelease;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/** @description responsible of downloading subtitle.
 * @param {string} downloadURL - download link
   @return {Promise.<Package>}
 */
var downloadSubtitle = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(downloadURL) {
    var op, response, filename, Package;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            op = (0, _http_options2.default)(downloadURL, 'english', 'GET');

            op.encoding = null;
            _context.next = 4;
            return (0, _req2.default)(op);

          case 4:
            response = _context.sent;
            filename = response.headers['content-disposition'].split(';')[1].split('=')[1];
            Package = {
              filename: filename,
              data: response.body
            };
            return _context.abrupt('return', Package);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function downloadSubtitle(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _req = __webpack_require__(2);

var _req2 = _interopRequireDefault(_req);

var _http_options = __webpack_require__(1);

var _http_options2 = _interopRequireDefault(_http_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = downloadSubtitle;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = __webpack_require__(5);

var _path2 = _interopRequireDefault(_path);

var _admZip = __webpack_require__(15);

var _admZip2 = _interopRequireDefault(_admZip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @description responsible of unpacking subtitles.
 * @param {string} data - pack
   @return {Promise.<Array>}
 */
function unzipSubtitleBuffer(data) {
    return new Promise(function (resolve, reject) {
        var files = [];
        // if rar neglict .. ******FEATURE  Neeeded*****
        if (_path2.default.extname(data.filename) == '.rar') {
            files.push({ 'fileName': data.filename, 'data': data.data });
            resolve(files);
        }

        try {
            var zip = new _admZip2.default(data.data);
            zip.getEntries().forEach(function (entry) {
                var entryName = entry.entryName;
                // decompressed buffer of the entry
                var decompressedData = zip.readFile(entry);
                files.push({ 'fileName': entryName, 'data': decompressedData });
            });
            resolve(files);
        } catch (e) {
            reject(new Error('Error while unzipping subtitle+\n' + e));
        }
    });
}

exports.default = unzipSubtitleBuffer;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("adm-zip");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = __webpack_require__(5);

var _path2 = _interopRequireDefault(_path);

var _fs = __webpack_require__(17);

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/** @description responsible of saving subtitle files to disk.
 * @param {string} savePath - location to save file.
 * @param {array} files - array of subtitle files.
   @return {Promise.<log>}
 */
function saveSubtitle(savePath, files) {
    return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
            var log;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            log = [];

                            files.map(function (file, n) {
                                var saveFile = _path2.default.join(savePath, file.fileName);
                                _fs2.default.writeFile(saveFile, file.data, function (err) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        log.push(saveFile);
                                    }
                                    if (n == files.length - 1) {
                                        resolve(log);
                                    }
                                });
                            });

                        case 2:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
}

exports.default = saveSubtitle;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })
/******/ ]);