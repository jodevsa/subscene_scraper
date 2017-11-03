'use strict';

import cheerio from 'cheerio';

const domain = 'https://subscene.com';

/** @description responsible of handling movie subtitles of type release.
 * @param {string} data - pack
   @return {Promise.<Array>}
 */
function handleRelease(data) {
  const $ = cheerio.load(data.body);
  const releaseTable = $('table tbody tr');
  const releaseLinks = Array.prototype.slice.call(releaseTable.map(
    (index, value) => {
    const path = $(value).children('.a1').children('a').eq(0).attr('href');
    const name = $(value).children('.a1').children('a')
    .eq(0).children('span').eq(1).text().trim();
    return {
      name: name,
      url: (domain + path),
    };
  }));
  return releaseLinks;
}

export default handleRelease;
