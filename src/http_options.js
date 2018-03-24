'use strict';

import getLanguageCode from './lang';
import {baseHttpOptions} from './options.json';

/** @description responsible of generating request options.
 * @param {string} URL - HTTP URL.
 * @param {string} lang - Subtitle language.
 * @param {string} method - HTTP METHOD (GET/HEAD/POST/PUT).
 * @param {string} body - HTTP request body.
 * @param {boolean} followRedirect - to follow redirects or not (true/false)
   @return {Promise.<Object>}
 */
function genHttpOptions(url='', lang='english', method='GET', body='', followRedirect=false) {
  
  let settings = {
    ...baseHttpOptions,
    headers:{...baseHttpOptions.headers},
    url,
    method,
    body
  }
  settings.headers.Cookie += (getLanguageCode(lang));
  console.log(lang,getLanguageCode(lang))
  return settings;
}

export default genHttpOptions;
