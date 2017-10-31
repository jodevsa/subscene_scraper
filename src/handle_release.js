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
            const $ = cheerio.load(data.body);
            const releaseTable = $('table tbody tr');
            const releaseLinks=Array.prototype.slice.call(
              releaseTable.map((index, value)=>{
              const path=
              $(value).children('.a1').children('a').eq(0).attr('href');
              return (domain+path);
            }));
            resolve(releaseLinks);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = handleRelease;
