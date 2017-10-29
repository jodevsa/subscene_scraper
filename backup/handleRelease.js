const cheerio = require('cheerio');
const {promisify} = require('util');
const req = promisify(require('request'));
const http_options = require('./http_options')

function handleRelease(data) {

    return new Promise(async function(resolve, reject) {
        let search_link = data.domain;
        let lang = data.lang;
        let domain = 'https://subscene.com';
        try {
            let $ = cheerio.load(data.body);
            let sub_link = $('table tbody tr').eq(0).children('.a1').children('a').eq(0).attr('href');
            resolve(domain + sub_link);
        } catch (e) {
            reject(e);
        }

    })
}

module.exports = handleRelease
