'use strict';

import {getExactTitleList, getExactTitlePassive} from './handle_title';
import handleRelease from './handle_release';
/**
 * @typedef MovieTypeData
 * @property {string} type type of movie (title/release).
 * @property {string} lang language needed for the movie subtitle.
 * @property {string} body html response of search request.
 */
/** @description handle's movies type (title/release).
 * @param {MovieTypeData} data
  * @param {MovieTypeData} isPassive
   @return {handleRelease|handleTitle}
 */
async function handleType(data, isPassive) {
    const handleTitle=isPassive?getExactTitlePassive:getExactTitleList;
    const handler=data.type === 'release' ? handleRelease : handleTitle;
    return handler(data);
}

module.exports = handleType;
