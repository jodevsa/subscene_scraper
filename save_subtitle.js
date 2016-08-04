var fs=require('fs');


function save_subtitle(path,callback){
return function(pack){

var saveFile=path+'/'+pack.filename;
fs.writeFile(saveFile,pack.data,function(err){
callback(err,saveFile)
return ;
})

}
}


module.exports=save_subtitle
