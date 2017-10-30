'use strict';

const cheerio = require('cheerio');
const domain = 'https://subscene.com';
/** @description responsible of handling movie subtitles of type release.
 * @param {string} data - pack
   @return {Promise.<Array>}
 */
function handleRelease(data) {
    return new Promise(async function(resolve, reject) {
        try {
            let $ = cheerio.load(data.body);
            let subLink = $('table tbody tr')
            .eq(0).children('.a1').children('a').eq(0).attr('href');
            resolve(domain + subLink);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = handleRelease;
