'use strict';

import getLanguageCode from './lang';


/** @description responsible of generating request options.
 * @param {string} URL - HTTP URL.
 * @param {string} lang - Subtitle language.
 * @param {string} method - HTTP METHOD (GET/HEAD/POST/PUT).
 * @param {string} body - HTTP request body.
 * @param {boolean} followRedirect - to follow redirects or not (true/false)
   @return {Promise.<Object>}
 */
function genHttpOptions(URL, lang, method, body, followRedirect) {
    const settings =Object.seal({
        followRedirect: false,
        method: 'GET',
        url: '',
        body: '',
        encoding: 'utf-8',
        gzip: true,
        headers: {
            'User-Agent': 'Mozilla/5.0',
            'Cookie': 'LanguageFilter=',
        },
    });
    settings.url = URL;
    settings.followRedirect = followRedirect || false;
    settings.method = method || 'GET';
    settings.headers.Cookie += (getLanguageCode(lang) || '13');
    settings.body = body || '';
    debugger;
    return settings;
}

module.exports = genHttpOptions;
