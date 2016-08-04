var cheerio=require('cheerio');
var r=require('request');
var Promise = require("bluebird");
var http_options=require('./http_options')


function handleRelease(data){

return new Promise(function(resolve,reject){
      var search_link=data.domain;
      var lang=data.lang;
      var domain = 'https://subscene.com';
  url=search_link;
  r(http_options(url,lang,'GET'),function(err,response,body){//    console.log(http_options(url,lang,'GET'));
    if(err){
      reject(err);
      return;
    }
    //console.log(body);
    try{
    $ = cheerio.load(body);
    //console.log("FUCl");
    var sub_link=$('table tbody tr').eq(0).children('.a1').children('a').eq(0).attr('href');
    resolve(domain+sub_link);
    return;
    //console.log(sub_link)

  }
  catch(e){
    reject(e);
    return;


  }

  });
})
}


module.exports=handleRelease
