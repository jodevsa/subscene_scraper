var cheerio=require('cheerio');
var r=require('request')
var Promise = require("bluebird");
var http_options=require('./http_options');
function download_subtitle(link){
return new Promise(function(resolve,reject){
  var op=http_options(link,'','GET');
  op.encoding=null;


  
r(op,function(err,response,body){

  if(err){
    reject(err);
    return;
  }
  else{
  var package={
    filename:response.headers['content-disposition'].split(';')[1].split('=')[1],
    data:body


  }
resolve(package)
return;
}
})



});
}


module.exports=download_subtitle;
