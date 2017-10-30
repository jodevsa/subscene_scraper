'use strict';

const handleTitle = require('./handle_title');
const handleRelease = require('./handle_release');
/**
 * @typedef MovieTypeData
 * @property {string} type type of movie (title/release).
 * @property {string} lang language needed for the movie subtitle.
 * @property {string} body html response of search request.
 */
/** @description handle's movies type (title/release).
 * @param {MovieTypeData} data
   @return {handleRelease|handleTitle}
 */
function handleType(data) {
    const handler=data.type === 'release' ? handleRelease : handleTitle;
    return handler(data);
}

module.exports = handleType;
