'use stric';

const fs = require('fs');
const path = require('path');

/** @description responsible of saving subtitle files to disk.
 * @param {string} savePath - location to save file.
 * @param {array} files - array of subtitle files.
   @return {Promise.<log>}
 */
function saveSubtitle(savePath, files) {
    return new Promise(async function(resolve, reject) {
        let log = [];
        files.map(function(file, n) {
            let saveFile = path.join(savePath, file.fileName);
            fs.writeFile(saveFile, file.data, function(err) {
                if (err) {
                    reject(err);
                } else {
                    log.push(saveFile);
                }
                if (n == files.length - 1) {
                    resolve(log);
                }
            });
        });
    });
}

module.exports = saveSubtitle;
