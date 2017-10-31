'use strict';

import {promisify} from 'util';
import request from 'request';
import cheerio from 'cheerio';
import httpOptions from './http_options';

const req = promisify(request);
const domain = 'https://subscene.com';
const TitleOptions = [
      'Exact',
      'Close',
      'Popular',
    'TV-Series',
];

/** @description responsible of choosing first title movie! when in passive
    mode.
 * @param {string} movieList - pack
   @return {string}
 */
 function chooseTitleMoviePassive(movieList) {
   let i=0;
   for (const movieType in movieList) {
     if (TitleOptions[i] === movieType) {
       return domain + movieList[movieType][0].link;
     }
     i+=1;
   }
 }
 /** @description responsible of handling movie subtitles of type title.
  * @param {string} data - pack
    @return {Promise.<Array>}
  */
async function handleTitle(data) {
    const {movies: movieList, lang: language} = await getTitleMovies(data);
    return await getTitleSubLink({lang: language,
      url: chooseTitleMoviePassive(movieList)});
}

/** @description responsible of handling movie subtitles of type title.
 * @param {string} data - pack
   @return {Promise.<Array>}
 */
function getTitleSubLink(data) {
    return new Promise(async function(resolve, reject) {
        const url = data.url;
        const lang = data.lang;
        try {
            const response = await req(httpOptions(url, lang, 'GET'));
            const $ = cheerio.load(response.body);
            const lastLink = $('table').eq(0).children('tbody').children('tr')
            .eq(0).children('.a1').children('a').eq(0).attr('href');

            if (lastLink === undefined || lastLink === '') {
                reject(new Error('Subtitles not found.'));
                return;
            } else {
                resolve(domain + lastLink);
            }
        } catch (e) {
            reject(e);
            return;
        }
    });
}

/** @description responsible of handling movie subtitles of type title.
 * @param {string} data - pack
   @return {Promise.<Array>}
 */
function getTitleMovies(data) {
    //  Exact>close>popular>tv-series
    return new Promise(function(resolve, reject) {
        const language= data.lang;
        try {
            const $ = cheerio.load(data.body);
            const movieTitleList={};

            $('div .search-result').children('h2').map(function(n, element) {
              const header=$(element).text();
              movieTitleList[header]=[];
              $(element).next().children('li').map((n, value)=>{
                $(value).children('div .title').children('a').map((n, Movie)=>{
                  const val={movie: $(Movie).text(),
                    link: $(Movie).attr('href')};

                  movieTitleList[header].push(val);
                  });
                });
            });

            resolve({movies: movieTitleList, lang: language});
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = handleTitle;
