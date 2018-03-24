'use strict';

import req from './req';
import httpOptions from './http_options';

/** @description responsible of downloading subtitle.
 * @param {string} downloadURL - download link
   @return {Promise.<Package>}
 */
async function downloadSubtitle(downloadURL,lang) {
  const op = httpOptions(downloadURL, lang, 'GET');
  op.encoding = null;
  const response = await req(op);
  const name = response.headers['content-disposition']
    .split(';')[1].split('=')[1];
  return {
    name,
    buffer: response.body,
  };
}

export default downloadSubtitle;
