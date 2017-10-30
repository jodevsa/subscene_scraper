"use strict";

const {promisify} = require('util');
const req = promisify(require('request'));
const http_options = require('./http_options')
const cheerio = require('cheerio');

async function handleTitle(data) {
    let search_link = data.domain
    let lang = data.lang;
    let link = await get_title_sub_list_link(data);
    return await get_title_sub_link(link);
}

function get_title_sub_link(data) {
    return new Promise(async function(resolve, reject) {

        let domain = 'https://subscene.com';
        let url = data.link
        let lang = data.lang
        try {
            let response = await req(http_options(url, lang, 'GET'));
            let $ = cheerio.load(response.body);
            let last_link = $('table').eq(0).children('tbody').children('tr').eq(0).children('.a1').children('a').eq(0).attr('href');

            if (last_link == undefined || last_link == "") {

                reject(new Error("Subtitles not found."));
                return;
            } else {

                last_link.replace(' ', '')
                resolve(domain + last_link);
            }
        } catch (e) {

            reject(e);
            return;
        }
    });

}

function get_title_sub_list_link(data) {
    //Exact>close>popular>tv-series

    return new Promise(function(resolve, reject) {
        let search_link = data.domain;
        let lang = data.lang;
        let domain = 'https://subscene.com';
        try {
            let options = {
                'TV-Series': 3,
                'Exact': 0,
                'Popular': 2,
                'Close': 1
            }

            let $ = cheerio.load(data.body);
            let $results = $('div .search-result').children('h2');

            let value = 0;
            let min = 4;
            $results.map(function(n, element) {
                if (options[$(element).text().replace(' ', '')] < min) {
                    min = options[$(element).text().replace(' ', '')];
                    value = n
                }

            });
            let $target = $($results[value]).next();;
            let titleLink=$target.children('li').eq(0).children('div .title').children('a').attr('href');
            if (titleLink == undefined) {
                reject(new Error("subtitles not found."));
                return;
            }
            resolve({link:(domain + titleLink),lang: lang});
        } catch (e) {

            //reject(e);
            reject(e)
            return;

        }

    });

};

module.exports = handleTitle;
