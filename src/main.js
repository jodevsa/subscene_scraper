'use strict';

import cheerio from 'cheerio';
import genHttpOptions from './http_options';
import handleType from './handle_type';
import downloadSubtitle from './download_subtitle';
import unzipSubtitleBuffer from './unzip_sub_buffer';
import saveSubtitle from './save_subtitle';
import getLangCode from './lang';
import req from './req';
import {getTitleSubtitles} from './handle_title';
import EventEmitter from 'events';
import {BASE_URI} from './options.json'

const TitleOptions = Object.freeze(['Exact', 'Close', 'Popular', 'TV-Series']);

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
async function determineMovieNameType(filename, lang) {
  const langCode = getLangCode(lang);
  if (!langCode) {
    return Promise.reject(new Error('language not supported!'));
  }
  const url = BASE_URI + '/subtitles/title?q=' + encodeURIComponent(filename);
  const reqOptions = genHttpOptions(url, lang, 'GET', '', true);
  const response = await req(reqOptions);
  const type = response.request._redirect.redirects.length === 0
    ? 'title'
    : 'release';
  return {'_name': filename, 'type': type, 'lang': langCode, 'body': response.body};
};

/** @description return's the first title in the available options
  [exact,close,popular,tv-series].
 * @param {string} movieList - the name of the movie.
   @return {String}
 */
function chooseTitleMoviePassive(movieList) {
  let i = 0;
  for (const movieType in movieList) {
    if (TitleOptions[i] === movieType) {
      return movieList[movieType][0].link;
    }
    i += 1;
  }
}

/** @description extract subtitle's download link.
 * @param {string} URL - the name of the movie.
   @return {Promise.<string>}
 */
async function getSubtitleDownloadLink(URL, lang) {
  // until we apply this to handleTitle
  // it will always be an array.
  const url = Array.isArray(URL)
    ? URL[0]
    : URL;
  const response = await req(genHttpOptions(url, lang, 'GET'));
  let $ = cheerio.load(response.body);
  let downloadLink = BASE_URI + $('.download a').attr('href');
  return downloadLink;
}

/** @description main function.
 * @param {string} movieName - the name of the movie.
 * @param {string} language - the name of the movie.
 * @param {string} path - the name of the movie.
   @return {Promise.<string>}
 */
async function getMovieSubtitleDetails(movieName, language) {
  let movieInfo = await determineMovieNameType(movieName, language);
  let result = await handleType(movieInfo);
  return {type: movieInfo.type, result: result};
}

/** @description download's and save's subtitle of releaseURL.
* @param {string} releaseURL - url of release.
* @param {string} location - location to save.
  @return {Object}
*/
async function downloadSubtitleFiles(releaseURL, location, lang) {
  const downloadLink = await getSubtitleDownloadLink(releaseURL, lang);
  const subtitleFile = await downloadSubtitle(downloadLink);
  const subtitlePackage = await unzipSubtitleBuffer(subtitleFile);
  return subtitlePackage;
}

/** @description simple async emitter....
* @param {string} emitter - the name of the movie.
* @param {string} e - event.
  @return {Object}
*/
function asyncemit(emitter, e, ...params) {
  return new Promise((resolve) => {
    emitter.emit(e, ...params, (c) => {
      resolve(c);
    });
  });
}

///////////////////////////////////////////////////////////////////////////////
////////// section: exported methods ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

/** @description download's subtitle passivly, choose's first subtitle found.
* @param {string} movieName - the name of the movie.
* @param {string} lang - the name of the movie.
* @param {string} path - the name of the movie.
  @return {Object}
*/
function interactiveDownloader(movieName, lang, path) {
  let emitter = new EventEmitter();
  process.nextTick(async () => {
    const language = lang || 'english';
    const movieInfo = await getMovieSubtitleDetails(movieName, language);
    let url;
    if (movieInfo.type === 'title') {
      const titleURL = await asyncemit(emitter, 'info', movieInfo);
      const list = await getTitleSubtitles({url: titleURL, lang: language});
      url = await asyncemit(emitter, 'title', list);
    } else {
      url = await asyncemit(emitter, 'info', movieInfo);
    }
    const unPackedSubtitles = await downloadSubtitleFiles(url, path, lang);
    if (arguments.length === 3) {
      result = await saveSubtitle(path || '.', unPackedSubtitles);
      emitter.emit('done', result, movieName);
    } else {
      emitter.emit('done', unPackedSubtitles, movieName);
    }
  });
  return emitter;
}

/** @description download's subtitle passivly, choose's first subtitle found.
* @param {string} movieName - the name of the movie.
* @param {string} lang - the name of the movie.
* @param {string} path - the name of the movie.
  @return {Promise.<string>}
*/
async function passiveDownloader(movieName, lang, path, options = {}) {
  const language = lang || 'english';
  const movieInfo = await getMovieSubtitleDetails(movieName, language);
  let url;
  if (movieInfo.type === 'title') {
    const movieURL = chooseTitleMoviePassive(movieInfo.result); // 1
    const list = await getTitleSubtitles({url: movieURL, lang: language});
    url = list[0].url; // 2
  } else {
    //passiveDownloader always picks the first result.
    //use the interactiveDownloader if you have a special uescase.
    url = movieInfo.result[0].url;
  }
  const result = await downloadSubtitleFiles(url, path, lang);
  if (arguments.length === 3) {
    return await saveSubtitle(path || '.', result);
  }

  return result;
}

///////////////////////////////////////////////////////////////////////////////
////////// end of exported methods section /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

export {
  interactiveDownloader,
  passiveDownloader
};
