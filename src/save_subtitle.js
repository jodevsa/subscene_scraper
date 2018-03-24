'use strict';

import path from 'path';
import fs from 'fs';

/** @description responsible of saving subtitle files to disk.
 * @param {string} savePath - location to save file.
 * @param {array} files - array of subtitle files.
   @return {Promise.<log>}
 */
function saveSubtitle(savePath, files) {
    return new Promise(async function(resolve, reject) {
        const log = [];
        files.map(function(file, n) {
            const saveFile = path.join(savePath, file.name);
            fs.writeFile(saveFile, file.buffer, function(err) {
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

export default saveSubtitle;
