var cheerio=require('cheerio');
var r=require('request');
var Promise = require("bluebird");
var http_options=require('./http_options')
var handleType=require('./handleType');
var download_subtitle = require('./download_subtitle');
var save_subtitle=require('./save_subtitle')

function determineMovieNameType(filename,lang){


return new Promise(function(resolve,reject){
const lang_code=require('./lang.js')(lang);


if(!lang_code){
  reject(new Error('language not supported!'))
  return;
}

var domain = 'https://subscene.com';
url = domain+'/subtitles/title?q='+encodeURIComponent(filename);
r(http_options(url,lang,'HEAD'),function(err,response,body){
  if(err){
    reject(err);
    return;
  }else{
    var type='';
    var loc;
    if(response.headers.location==undefined ||response.headers.location==''){

      type='title';
      loc=url;


}
else{

  type=response.headers.location.split('/')[2].split('?')[0];
  loc=domain+response.headers.location;

}

    resolve({type:type,domain:loc,lang:lang_code});

  }

});



})
};

function get_subtitle_download_link(link){
  var domain = 'https://subscene.com';
return new Promise(function(resolve,reject){
r(http_options(link,'GET'),function(err,response,body){
if(err){
reject(err);
return ;
}
else{
try{
$=cheerio.load(body);
var link=domain+$('.download a').attr('href');
resolve(link)
}
catch(e){
  reject(e);
  return;
}
}

})

});
}



function handle_error(callback){
return function(error){
callback(error);

}
}


















function subscene_scraper(movieName,language,path,callback){
if(arguments.length!=4){
  arguments[arguments.length-1](new Error("4 parameters must be passed for this function to work."));
  return;
}
determineMovieNameType(movieName,language)
.then(handleType)
.then(get_subtitle_download_link)
.then(download_subtitle)
.then(save_subtitle(path,callback))
.catch(handle_error(callback))
};



module.exports=subscene_scraper;
