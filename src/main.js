'use strict';

import cheerio from 'cheerio';
import {promisify} from 'util';
import request from 'request';
import genHttpOptions from './http_options';
import handleType from './handle_type';
import downloadSubtitle from './download_subtitle';
import unzipSubtitleBuffer from './unzip_sub_buffer';
import saveSubtitle from './save_subtitle';
import getLangCode from './lang';

const domain = 'https://subscene.com/';
const req = promisify(request);
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
    return new Promise(async function(resolve, reject) {
      let langCode=getLangCode(lang);
        if (!langCode) {
            reject(new Error('language not supported!'));
            return;
        }

        let url = domain + '/subtitles/title?q=' + encodeURIComponent(filename);
        try {
            const reqOptions=genHttpOptions(url, lang, 'GET', '', true);
            let response = await req(reqOptions);
            let type = response.request._redirect.redirects.length === 0
                ? 'title'
                : 'release';
            resolve({'type': type, 'lang': langCode, 'body': response.body});
        } catch (e) {
            reject(e);
        }
    });
};

/** @description extract subtitle's download link.
 * @param {string} URL - the name of the movie.
   @return {Promise.<string>}
 */
function getSubtitleDownloadLink(URL) {
    return new Promise(async function(resolve, reject) {
        // until we apply this to handleTitle
        // it will always be an array.
        const url = Array.isArray(URL)?URL[0]:URL;
        try {
            let response = await req(genHttpOptions(url, 'GET', ''));
            let $ = cheerio.load(response.body);
            let downloadLink = domain + $('.download a').attr('href');
            resolve(downloadLink);
        } catch (e) {
            reject(e);
        }
    });
}

/** @description main function.
 * @param {string} movieName - the name of the movie.
 * @param {string} language - the name of the movie.
 * @param {string} path - the name of the movie.
   @return {Promise.<string>}
 */
async function subsceneScraper(movieName, language, path) {
        let movieInfo = await determineMovieNameType(movieName, language);
        let movieType = await handleType(movieInfo);
        let movieDownloadLink = await getSubtitleDownloadLink(movieType);
        let subtitle = await downloadSubtitle(movieDownloadLink);
        let files = await unzipSubtitleBuffer(subtitle);
        return await saveSubtitle(path, files);
};

/** @description main interface function.
 * @param {string} movieName - the name of the movie.
 * @param {string} language - the name of the movie.
 * @param {string} path - the name of the movie.
   @param {function} cb - callback.
 */
async function mainInterface(movieName, language, path, cb) {
if (arguments.length != 4) {
    let cb = arguments[arguments.length - 1];
    cb(new Error('4 parameters must be passed for this function to work.'));
} else {
    try {
        let data = await subsceneScraper(movieName, language, path);
        cb(null, data);
    } catch (e) {
        cb(e);
    }
}
}


module.exports = mainInterface;
