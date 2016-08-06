var fs=require('fs');
var path=require('path')

function save_subtitle(path_to_save,callback){


return function(pack){
var log=[]
pack.map(function(file,n){
var saveFile=path.join(path_to_save,file.fileName)
fs.writeFile(saveFile,file.data,function(err){
  if(err){
    callback(err,saveFile);
    return;
  }
  else{

    log.push(saveFile);

}
if(n==pack.length-1){

callback(err,log);
return;
}


})

})



}

}


module.exports=save_subtitle
