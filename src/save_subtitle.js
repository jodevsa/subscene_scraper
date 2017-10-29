"use strict";

const fs=require('fs');
const path=require('path')

function save_subtitle(path_to_save,pack){
return new Promise(async function(resolve, reject) {
let log=[]
pack.map(function(file,n){
let saveFile=path.join(path_to_save,file.fileName)
fs.writeFile(saveFile,file.data,function(err){
  if(err){
    reject(err)
  }
  else{

    log.push(saveFile);

}
if(n==pack.length-1){

resolve(log);
}


})

})


});
}




module.exports=save_subtitle
