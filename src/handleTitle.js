'use strict';

const {promisify} = require('util');
const req = promisify(require('request'));
const httpOptions = require('./http_options');
const cheerio = require('cheerio');

/** @description responsible of handling movie subtitles of type title.
 * @param {string} data - pack
   @return {Promise.<Array>}
 */
async function handleTitle(data) {
    let link = await getTitleSubListLink(data);
    return await getTitleSubLink(link);
}

/** @description responsible of handling movie subtitles of type title.
 * @param {string} data - pack
   @return {Promise.<Array>}
 */
function getTitleSubLink(data) {
    return new Promise(async function(resolve, reject) {
        let domain = 'https://subscene.com';
        let url = data.link;
        let lang = data.lang;
        try {
            let response = await req(httpOptions(url, lang, 'GET'));
            let $ = cheerio.load(response.body);
            let lastLink = $('table').eq(0).children('tbody').children('tr')
            .eq(0).children('.a1').children('a').eq(0).attr('href');

            if (lastLink === undefined || lastLink === '') {
                reject(new Error('Subtitles not found.'));
                return;
            } else {
                resolve(domain + lastLink);
            }
        } catch (e) {
            reject(e);
            return;
        }
    });
}

/** @description responsible of handling movie subtitles of type title.
 * @param {string} data - pack
   @return {Promise.<Array>}
 */
function getTitleSubListLink(data) {
    //  Exact>close>popular>tv-series
    return new Promise(function(resolve, reject) {
        let lang = data.lang;
        let domain = 'https://subscene.com';
        try {
            let options = {
                'TV-Series': 3,
                'Exact': 0,
                'Popular': 2,
                'Close': 1,
            };
            let $ = cheerio.load(data.body);
            let $results = $('div .search-result').children('h2');

            let value = 0;
            let min = 4;
            $results.map(function(n, element) {
                if (options[$(element).text().replace(' ', '')] < min) {
                    min = options[$(element).text().replace(' ', '')];
                    value = n;
                }
            });
            let $target = $($results[value]).next();
            let titleLink=$target.children('li').eq(0)
            .children('div .title').children('a').attr('href');
            if (titleLink == undefined) {
                reject(new Error('subtitles not found.'));
                return;
            }
            resolve({link: (domain + titleLink), lang: lang});
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = handleTitle;
