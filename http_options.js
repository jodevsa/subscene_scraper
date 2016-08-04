var main_http_options={
    pool:{maxSockets:5},
    followRedirect:false,
    method:'GET',
    url:'',
    body:'',
    gzip:true,
    timeout:5000,
    headers:{
      'User-Agent': 'Mozilla/5.0',
      'Cookie':'LanguageFilter='
    }

  }

var http_options=function(url,lang,method,body){


var settings=main_http_options;
settings.url=url;
settings.method=method || 'GET';
settings.headers.Cookie='LanguageFilter='+(lang||'13');
settings.body=body;
return settings;
}


module.exports=http_options;
