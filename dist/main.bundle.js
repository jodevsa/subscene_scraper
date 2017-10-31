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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mainHttpOptions = {
    followRedirect: false,
    method: 'GET',
    url: '',
    body: '',
    gzip: true,
    headers: {
        'User-Agent': 'Mozilla/5.0',
        'Cookie': 'LanguageFilter='
    }
};

/** @description responsible of generating request options.
 * @param {string} url - HTTP URL.
 * @param {string} lang - Subtitle language.
 * @param {string} method - HTTP METHOD (GET/HEAD/POST/PUT).
 * @param {string} body - HTTP request body.
 * @param {boolean} followRedirect - to follow redirects or not (true/false)
   @return {Promise.<Object>}
 */
function genHttpOptions(url, lang, method, body, followRedirect) {
    var settings = mainHttpOptions;
    settings.url = url;
    settings.followRedirect = followRedirect || false;
    settings.method = method || 'GET';
    settings.headers.Cookie = 'LanguageFilter=' + (lang || '13');
    settings.body = body || '';
    return settings;
}

module.exports = genHttpOptions;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6);
module.exports = __webpack_require__(7);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** @description main function.
 * @param {string} movieName - the name of the movie.
 * @param {string} language - the name of the movie.
 * @param {string} path - the name of the movie.
   @return {Promise.<string>}
 */
var subsceneScraper = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(movieName, language, path) {
        var movieInfo, movieType, movieDownloadLink, subtitle, files;
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
                        movieType = _context3.sent;
                        _context3.next = 8;
                        return getSubtitleDownloadLink(movieType);

                    case 8:
                        movieDownloadLink = _context3.sent;
                        _context3.next = 11;
                        return (0, _download_subtitle2.default)(movieDownloadLink);

                    case 11:
                        subtitle = _context3.sent;
                        _context3.next = 14;
                        return (0, _unzip_sub_buffer2.default)(subtitle);

                    case 14:
                        files = _context3.sent;
                        _context3.next = 17;
                        return (0, _save_subtitle2.default)(path, files);

                    case 17:
                        return _context3.abrupt('return', _context3.sent);

                    case 18:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function subsceneScraper(_x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
    };
}();

/** @description main interface function.
 * @param {string} movieName - the name of the movie.
 * @param {string} language - the name of the movie.
 * @param {string} path - the name of the movie.
   @param {function} cb - callback.
 */
var mainInterface = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(movieName, language, path, cb) {
        var _cb,
            data,
            _args4 = arguments;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        if (!(_args4.length != 4)) {
                            _context4.next = 5;
                            break;
                        }

                        _cb = _args4[_args4.length - 1];

                        _cb(new Error('4 parameters must be passed for this function to work.'));
                        _context4.next = 15;
                        break;

                    case 5:
                        _context4.prev = 5;
                        _context4.next = 8;
                        return subsceneScraper(movieName, language, path);

                    case 8:
                        data = _context4.sent;

                        cb(null, data);
                        _context4.next = 15;
                        break;

                    case 12:
                        _context4.prev = 12;
                        _context4.t0 = _context4['catch'](5);

                        cb(_context4.t0);

                    case 15:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[5, 12]]);
    }));

    return function mainInterface(_x8, _x9, _x10, _x11) {
        return _ref4.apply(this, arguments);
    };
}();

var _cheerio = __webpack_require__(0);

var _cheerio2 = _interopRequireDefault(_cheerio);

var _util = __webpack_require__(1);

var _request = __webpack_require__(2);

var _request2 = _interopRequireDefault(_request);

var _http_options = __webpack_require__(3);

var _http_options2 = _interopRequireDefault(_http_options);

var _handle_type = __webpack_require__(8);

var _handle_type2 = _interopRequireDefault(_handle_type);

var _download_subtitle = __webpack_require__(11);

var _download_subtitle2 = _interopRequireDefault(_download_subtitle);

var _unzip_sub_buffer = __webpack_require__(12);

var _unzip_sub_buffer2 = _interopRequireDefault(_unzip_sub_buffer);

var _save_subtitle = __webpack_require__(14);

var _save_subtitle2 = _interopRequireDefault(_save_subtitle);

var _lang = __webpack_require__(16);

var _lang2 = _interopRequireDefault(_lang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var domain = 'https://subscene.com/';
var req = (0, _util.promisify)(_request2.default);
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
function determineMovieNameType(filename, lang) {
    return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
            var langCode, url, reqOptions, response, type;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            langCode = (0, _lang2.default)(lang);

                            if (langCode) {
                                _context.next = 4;
                                break;
                            }

                            reject(new Error('language not supported!'));
                            return _context.abrupt('return');

                        case 4:
                            url = domain + '/subtitles/title?q=' + encodeURIComponent(filename);
                            _context.prev = 5;
                            reqOptions = (0, _http_options2.default)(url, lang, 'GET', '', true);
                            _context.next = 9;
                            return req(reqOptions);

                        case 9:
                            response = _context.sent;
                            type = response.request._redirect.redirects.length === 0 ? 'title' : 'release';

                            resolve({ 'type': type, 'lang': langCode, 'body': response.body });
                            _context.next = 17;
                            break;

                        case 14:
                            _context.prev = 14;
                            _context.t0 = _context['catch'](5);

                            reject(_context.t0);

                        case 17:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[5, 14]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
};

/** @description extract subtitle's download link.
 * @param {string} URL - the name of the movie.
   @return {Promise.<string>}
 */
function getSubtitleDownloadLink(URL) {
    return new Promise(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
            var url, response, $, downloadLink;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            // until we apply this to handleTitle
                            // it will always be an array.
                            url = Array.isArray(URL) ? URL[0] : URL;
                            _context2.prev = 1;
                            _context2.next = 4;
                            return req((0, _http_options2.default)(url, 'GET', ''));

                        case 4:
                            response = _context2.sent;
                            $ = _cheerio2.default.load(response.body);
                            downloadLink = domain + $('.download a').attr('href');

                            resolve(downloadLink);
                            _context2.next = 13;
                            break;

                        case 10:
                            _context2.prev = 10;
                            _context2.t0 = _context2['catch'](1);

                            reject(_context2.t0);

                        case 13:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[1, 10]]);
        }));

        return function (_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }());
};

module.exports = mainInterface;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handleTitle = __webpack_require__(9);
var handleRelease = __webpack_require__(10);
/**
 * @typedef MovieTypeData
 * @property {string} type type of movie (title/release).
 * @property {string} lang language needed for the movie subtitle.
 * @property {string} body html response of search request.
 */
/** @description handle's movies type (title/release).
 * @param {MovieTypeData} data
   @return {handleRelease|handleTitle}
 */
function handleType(data) {
  var handler = data.type === 'release' ? handleRelease : handleTitle;
  return handler(data);
}

module.exports = handleType;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** @description responsible of handling movie subtitles of type title.
 * @param {string} data - pack
   @return {Promise.<Array>}
 */
var handleTitle = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
        var _ref2, movieList, language;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return getTitleMovies(data);

                    case 2:
                        _ref2 = _context.sent;
                        movieList = _ref2.movies;
                        language = _ref2.lang;
                        _context.next = 7;
                        return getTitleSubLink({ lang: language,
                            url: chooseTitleMoviePassive(movieList) });

                    case 7:
                        return _context.abrupt('return', _context.sent);

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function handleTitle(_x) {
        return _ref.apply(this, arguments);
    };
}();

/** @description responsible of handling movie subtitles of type title.
 * @param {string} data - pack
   @return {Promise.<Array>}
 */


var _util = __webpack_require__(1);

var _request = __webpack_require__(2);

var _request2 = _interopRequireDefault(_request);

var _cheerio = __webpack_require__(0);

var _cheerio2 = _interopRequireDefault(_cheerio);

var _http_options = __webpack_require__(3);

var _http_options2 = _interopRequireDefault(_http_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var req = (0, _util.promisify)(_request2.default);
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
}function getTitleSubLink(data) {
    return new Promise(function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
            var url, lang, response, $, lastLink;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            url = data.url;
                            lang = data.lang;
                            _context2.prev = 2;
                            _context2.next = 5;
                            return req((0, _http_options2.default)(url, lang, 'GET'));

                        case 5:
                            response = _context2.sent;
                            $ = _cheerio2.default.load(response.body);
                            lastLink = $('table').eq(0).children('tbody').children('tr').eq(0).children('.a1').children('a').eq(0).attr('href');

                            if (!(lastLink === undefined || lastLink === '')) {
                                _context2.next = 13;
                                break;
                            }

                            reject(new Error('Subtitles not found.'));
                            return _context2.abrupt('return');

                        case 13:
                            resolve(domain + lastLink);

                        case 14:
                            _context2.next = 20;
                            break;

                        case 16:
                            _context2.prev = 16;
                            _context2.t0 = _context2['catch'](2);

                            reject(_context2.t0);
                            return _context2.abrupt('return');

                        case 20:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[2, 16]]);
        }));

        return function (_x2, _x3) {
            return _ref3.apply(this, arguments);
        };
    }());
}

/** @description responsible of handling movie subtitles of type title.
 * @param {string} data - pack
   @return {Promise.<Array>}
 */
function getTitleMovies(data) {
    //  Exact>close>popular>tv-series
    return new Promise(function (resolve, reject) {
        var language = data.lang;
        try {
            var $ = _cheerio2.default.load(data.body);
            var movieTitleList = {};

            $('div .search-result').children('h2').map(function (n, element) {
                var header = $(element).text();
                movieTitleList[header] = [];
                $(element).next().children('li').map(function (n, value) {
                    $(value).children('div .title').children('a').map(function (n, Movie) {
                        var val = { movie: $(Movie).text(),
                            link: $(Movie).attr('href') };

                        movieTitleList[header].push(val);
                    });
                });
            });

            resolve({ movies: movieTitleList, lang: language });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = handleTitle;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var cheerio = __webpack_require__(0);
var domain = 'https://subscene.com';
/** @description responsible of handling movie subtitles of type release.
 * @param {string} data - pack
   @return {Promise.<Array>}
 */
function handleRelease(data) {
    return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
            var $, releaseTable, releaseLinks;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            try {
                                $ = cheerio.load(data.body);
                                releaseTable = $('table tbody tr');
                                releaseLinks = Array.prototype.slice.call(releaseTable.map(function (index, value) {
                                    var path = $(value).children('.a1').children('a').eq(0).attr('href');
                                    return domain + path;
                                }));

                                resolve(releaseLinks);
                            } catch (e) {
                                reject(e);
                            }

                        case 1:
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

module.exports = handleRelease;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = __webpack_require__(1),
    promisify = _require.promisify;

var req = promisify(__webpack_require__(2));
var httpOptions = __webpack_require__(3);

/** @description responsible of downloading subtitle.
 * @param {string} link - download link
   @return {Promise.<Package>}
 */
function downloadSubtitle(link) {
    return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
            var op, response, Package;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            op = httpOptions(link, '', 'GET');

                            op.encoding = null;
                            _context.prev = 2;
                            _context.next = 5;
                            return req(op);

                        case 5:
                            response = _context.sent;
                            Package = {
                                filename: response.headers['content-disposition'].split(';')[1].split('=')[1],
                                data: response.body
                            };

                            resolve(Package);
                            _context.next = 13;
                            break;

                        case 10:
                            _context.prev = 10;
                            _context.t0 = _context['catch'](2);

                            reject(_context.t0);

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[2, 10]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
}

module.exports = downloadSubtitle;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AdmZip = __webpack_require__(13);
var path = __webpack_require__(4);

/** @description responsible of unpacking subtitles.
 * @param {string} data - pack
   @return {Promise.<Array>}
 */
function unzipSubtitleBuffer(data) {
    return new Promise(function (resolve, reject) {
        var files = [];
        // if rar neglict .. ******ISSUE*****
        if (path.extname(data.filename) == '.rar') {
            files.push({ 'fileName': data.filename, 'data': data.data });
            resolve(files);
        }

        try {
            var zip = new AdmZip(data.data);
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

module.exports = unzipSubtitleBuffer;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("adm-zip");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

'use stric';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fs = __webpack_require__(15);
var path = __webpack_require__(4);

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
                                var saveFile = path.join(savePath, file.fileName);
                                fs.writeFile(saveFile, file.data, function (err) {
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

module.exports = saveSubtitle;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var languageSet = {
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
};

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

module.exports = getLanguageCode;

/***/ })
/******/ ]);