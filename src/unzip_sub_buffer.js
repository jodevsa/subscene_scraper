"use strict";

const AdmZip = require('adm-zip');
const path = require('path');

function unzip_sub_buffer(data) {

    return new Promise(function(resolve, reject) {
        let files = []
        // if rar neglict .. ******ISSUE*****
        if (path.extname(data.filename) == '.rar') {
            files.push({'fileName': data.filename, 'data': data.data})
            resolve(files);
        }

        try {
            let zip = new AdmZip(data.data);
            zip.getEntries().forEach(function(entry) {
                let entryName = entry.entryName;
                let decompressedData = zip.readFile(entry); // decompressed buffer of the entry
                files.push({'fileName': entryName, 'data': decompressedData})

            });
            resolve(files);
        } catch (e) {
            reject(new Error("Error while unzipping subtitle+\n" + e));
        }

    })
}

module.exports = unzip_sub_buffer;
