"use strict";

const {promisify} = require('util');
const req = promisify(require('request'));
const cheerio = require('cheerio');
const http_options = require('./http_options');

function download_subtitle(link) {
    return new Promise(async function(resolve, reject) {
        let op = http_options(link, '', 'GET');
        op.encoding = null;
        try {
            let response = await req(op);
            let Package = {
                filename: response.headers['content-disposition'].split(';')[1].split('=')[1],
                data: response.body
            }
            resolve(Package)
        } catch (e) {
            reject(e);
        }

    });
}

module.exports = download_subtitle;
