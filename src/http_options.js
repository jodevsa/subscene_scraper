'use strict';

let mainHttpOptions = {
    followRedirect: false,
    method: 'GET',
    url: '',
    body: '',
    gzip: true,
    headers: {
        'User-Agent': 'Mozilla/5.0',
        'Cookie': 'LanguageFilter=',
    },
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
    let settings = mainHttpOptions;
    settings.url = url;
    settings.followRedirect = followRedirect || false;
    settings.method = method || 'GET';
    settings.headers.Cookie = 'LanguageFilter=' + (lang || '13');
    settings.body = body || '';
    return settings;
}

module.exports = genHttpOptions;
