'use strict';

import {languageMap} from './options.json'

/** @description map string language with it's subscene langCode.
 * @param {string} lang - location to save file.
   @return {boolean}
 */
function getLanguageCode(lang) {
    let l = lang.toLowerCase().trim();
    if (languageMap[l] != undefined) {
        return languageMap[l];
    } else {
        return false;
    }
}

export default getLanguageCode;
