"use strict";

let main_http_options = {
    followRedirect: false,
    method: 'GET',
    url: '',
    body: '',
    gzip: true,
    headers: {
        'User-Agent': 'Mozilla/5.0',
        'Cookie': 'LanguageFilter='
    }

}

function http_options(url, lang, method, body, followRedirect) {
    let settings = main_http_options;
    settings.url = url;
    settings.followRedirect = followRedirect || false;
    settings.method = method || 'GET';
    settings.headers.Cookie = 'LanguageFilter=' + (lang || '13');
    settings.body = body || '';
    return settings;
}

module.exports = http_options;
