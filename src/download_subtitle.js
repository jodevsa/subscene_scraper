'use strict';

const {promisify} = require('util');
const req = promisify(require('request'));
const httpOptions = require('./http_options');

/** @description responsible of downloading subtitle.
 * @param {string} link - download link
   @return {Promise.<Package>}
 */
function downloadSubtitle(link) {
    return new Promise(async function(resolve, reject) {
        let op = httpOptions(link, '', 'GET');
        op.encoding = null;
        try {
            let response = await req(op);
            let Package = {
                filename: response
                .headers['content-disposition'].split(';')[1].split('=')[1],
                data: response.body,
            };
            resolve(Package);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = downloadSubtitle;
