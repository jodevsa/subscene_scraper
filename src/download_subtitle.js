'use strict';

import req from './req';
import httpOptions from './http_options';

/** @description responsible of downloading subtitle.
 * @param {string} downloadURL - download link
   @return {Promise.<Package>}
 */
async function downloadSubtitle(downloadURL) {
  const op = httpOptions(downloadURL, 'english', 'GET');
  op.encoding = null;
  const response = await req(op);
  const filename=response.headers['content-disposition']
  .split(';')[1].split('=')[1];
  let Package = {
    filename: filename,
    data: response.body,
  };
  return Package;
}

module.exports = downloadSubtitle;
