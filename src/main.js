"use strict";

const cheerio = require('cheerio');
const {promisify} = require('util');
const req = promisify(require('request'));
const http_options = require('./http_options')
const handleType = require('./handleType');
const download_subtitle = require('./download_subtitle');
const unzip_sub_buffer = require('./unzip_sub_buffer');
const save_subtitle = require('./save_subtitle')
const domain = 'https://subscene.com/';

function determineMovieNameType(filename, lang) {

    return new Promise(async function(resolve, reject) {
        const lang_code = require('./lang.js')(lang);

        if (!lang_code) {
            reject(new Error('language not supported!'))
            return;
        }

        let url = domain + '/subtitles/title?q=' + encodeURIComponent(filename);
        try {
            let response = await req(http_options(url, lang, 'GET', '', true));
            let type = response.request._redirect.redirects.length === 0
                ? 'title'
                : 'release';
            resolve({type: type, lang: lang_code, "body": response.body});
        } catch (e) {
            reject(e);
        }
    })
};

function get_subtitle_download_link(Url) {
    return new Promise(async function(resolve, reject) {
        try {
            let response = await req(http_options(Url, 'GET', ''));
            let $ = cheerio.load(response.body);
            let downloadLink = domain + $('.download a').attr('href');
            resolve(downloadLink)
        } catch (e) {
            reject(e);
        }

    });
}

function handle_error(callback) {
    return function(error) {
        callback(error);

    }
}

async function subscene_scraper(movieName, language, path, cb) {
    if (arguments.length != 4) {
        arguments[arguments.length - 1](new Error("4 parameters must be passed for this function to work."));
        return;
    }
    try {
        let movieInfo = await determineMovieNameType(movieName, language);
        let movieType = await handleType(movieInfo);
        let movieDownloadLink = await get_subtitle_download_link(movieType);
        let subtitle = await download_subtitle(movieDownloadLink);
        let pack = await unzip_sub_buffer(subtitle);
        cb(null, await save_subtitle(path, pack));
    } catch (e) {
        cb(e);
    }
};


module.exports = subscene_scraper;
