'use strict';
require('util.promisify').shim();
import request from 'request';
import util from 'util';
const reqP = util.promisify(request);
const retry = 3;
const blockCode = 409;
const sleeptime = 800;

/** @description sleep//setTimeout.
 * @param {string} seconds - number of seconds to sleep.
   @return {Respones}
*/
function sleep(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(seconds);
    }, seconds);
  });
}

/** @description wrapper around a promisifed request function that retries.
 * @param {Object} options - request optipons.
   @return {Respones}
*/
async function req(options) {
  console.log(1000)
  let response = await reqP(options);
  let i = 0;
  while (response.statusCode === blockCode && i < retry) {
    await sleep(sleeptime);
    response = await reqP(options);
    i += 1;
  }
  if (response.statusCode === blockCode) {
    return Promise.reject(new Error('script got blocked 409 resCode'));
  }
  return response;
}

export default req;
