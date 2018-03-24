'use strict';

import path from 'path';
import AdmZip from 'adm-zip';

/** @description responsible of unpacking subtitles.
 * @param {string} data - pack
   @return {Promise.<Array>}
 */
function unzipSubtitleBuffer(subtitleFile) {
  return new Promise(function(resolve, reject) {
    const files = [];
    // waiting for someone to implement an unrar library written in JS!
    // PR when available! :P
    if (path.extname(subtitleFile.name) == '.rar') {
      files.push({'name': subtitleFile.name, 'buffer': subtitleFile.buffer});
      resolve(files);
    }

    try {
      const zip = new AdmZip(subtitleFile.buffer);
      zip.getEntries().forEach(function(entry) {
        const entryName = entry.entryName;
        // decompressed buffer of the entry
        const decompressedData = zip.readFile(entry);
        files.push({'name': entryName, 'buffer': decompressedData});
      });
      resolve(files);
    } catch (e) {
      reject(new Error('Error while unzipping subtitle+\n' + e));
    }
  });
}

export default unzipSubtitleBuffer;
