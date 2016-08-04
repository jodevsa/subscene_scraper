var sub=require('./index.js')
var sub2=require('subscene_scraper')
var ndbug = require('debug')('sub_new');
ndbug('fetching for interstellar')
sub('Batman (1966)','english','/home/jodevsa/Desktop',function(err,sp){
  if(err){
      console.log(err)
      return;
  }
  ndbug('interstellar sub downloaded to '+sp);
//console.log(sp);

});
