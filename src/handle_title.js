'use strict';

import cheerio from 'cheerio';
import httpOptions from './http_options';
import req from './req';

const domain = 'https://subscene.com';
const TitleOptions = ['Exact', 'Close', 'Popular', 'TV-Series'];

/** @description responsible of choosing first title movie! when in passive
    mode.
 * @param {string} movieList - pack
   @return {string}
 */
function chooseTitleMoviePassive(movieList) {
  let i = 0;
  for (const movieType in movieList) {
    if (TitleOptions[i] === movieType) {
      return domain + movieList[movieType][0].link;
    }
    i += 1;
  }
}
/** @description responsible of choosing first title movie! when in passive
     mode.
  * @param {string} movieList - pack
    @return {string}
  */
/** @description responsible of handling movie subtitles of type title.
  * @param {string} data - pack
  * @param {string} passive - pack
    @return {Promise.<Array>}
  */
async function getExactTitleList(data) {
  const {movies: movieList} = await getTitles(data);
  return movieList;
}
/** @description responsible of handling movie subtitles of type title.
 * @param {string} data - pack
 * @param {string} passive - pack
   @return {Promise.<Array>}
 */
async function getExactTitlePassive(data) {
  const {movies: movieList, lang: language} = await getTitles(data);
  const result = chooseTitleMoviePassive(movieList);
  return await getTitleSubLink({lang: language, result: result});
}

/** @description responsible of handling movie subtitles of type title.
 * @param {string} data - pack
   @return {Array}
 */
async function getTitleSubtitles(data) {
  const url = data.url;
  const lang = data.lang;
  const op = httpOptions(url, lang, 'GET');
  const response = await req(op);
  const $ = cheerio.load(response.body);
  const subtitles = [];
  const lastLink = $('table').eq(0).children('tbody')
  .children('tr').children('td.a1');
  lastLink.map((index, val) => {
    const releaseUrl = $(val).children('a').attr('href');
    const releaseName = $(val).children('a')
    .children('span').eq(1).text().trim();
    subtitles.push({
      url: domain + releaseUrl,
      name: releaseName,
    });
  });
  return subtitles;
}

/** @description responsible of handling movie subtitles of type title.
 * @param {string} data - pack
   @return {Promise.<Array>}
 */
async function getTitles(data) {
  //  Exact>close>popular>tv-series
  const language = data.lang;
  const $ = cheerio.load(data.body);
  const movieTitleList = {};
  $('div .search-result').children('h2').map(function(n, element) {
    const header = $(element).text();
    movieTitleList[header] = [];
    $(element).next().children('li').map((n, value) => {
      $(value).children('div .title').children('a').map((n, Movie) => {
        const val = {
          name: $(Movie).text(),
          link: domain + $(Movie).attr('href'),
        };

        movieTitleList[header].push(val);
      });
    });
  });

  return {movies: movieTitleList, lang: language};
};

export {getTitleSubtitles, getExactTitlePassive, getExactTitleList};
