var r=require('request');
var http_options=require('./http_options')
var cheerio=require('cheerio');
var Promise = require("bluebird");

function handleTitle(data){
  var search_link=data.domain
  var lang=data.lang;
 return new get_title_sub_list_link(data)
.then(get_title_sub_link)
}

function get_title_sub_link(data){
return new Promise(function(resolve,reject){

var domain = 'https://subscene.com';
    var url=data.link
    var lang=data.lang

    r(http_options(url,lang,'GET'),function(err,response,body){
      if(err){
        reject(err);
        return ;
      }
      try{
      $=cheerio.load(body);
      //console.log(body)

      var last_link=$('table').eq(0).children('tbody').children('tr').eq(0).children('.a1').children('a').eq(0).attr('href');



        if(last_link==undefined ||last_link ==""){

          reject(new Error("Subtitles not found."));
          return ;
        }
        else{

      last_link.replace(' ','')
      resolve(domain+last_link);
    }
  }
  catch(e){

    reject(e);
    return;
  }
    });
});

}

function get_title_sub_list_link(data){
//Exact>close>popular>tv-series

  return new Promise(function(resolve,reject){
    var search_link=data.domain;
    var lang=data.lang;
    var domain = 'https://subscene.com';
  url=search_link;
  r(http_options(url,lang,'GET'),function(err,response,body){
    if(err){
      reject(err);
      return;
    }
    try{
      var options={
        'TV-Series':3,
        'Exact':0,
        'Popular':2,
        'Close':1
      }

      $=cheerio.load(body);
      $results=$('div .search-result').children('h2');
      //console.log("fuck")
      var value=0;
      var min=4;
        $results.map(function(n,element){
        if(options[$(element).text().replace(' ','')]<min){
          min=options[$(element).text().replace(' ','')];
          value=n
      }


      });
    $target=$($results[value]).next();;

    var link=$target.children('li').eq(0).children('div .title').children('a').attr('href');

    if(link==undefined){
      reject(new Error("subtitles not found."));
      return;
    }

    resolve({link:(domain+link),lang:lang});
    }
    catch(e){

      //reject(e);
      reject($target.text()+"..."+search_link)
      return;


    }


  });


});


};

module.exports=handleTitle;
