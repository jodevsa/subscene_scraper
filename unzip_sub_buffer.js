var AdmZip = require('adm-zip');
var Promise = require("bluebird");
var path=require('path');

function unzip_sub_buffer(data){

return new Promise(function(resolve,reject){
  var files=[]
  // if rar neglict ..
  if(path.extname(data.filename)=='.rar'){
    files.push({'fileName':data.filename,'data':data.data})
    resolve(files);
  }

  try{
var zip = new AdmZip(data.data);
zip.getEntries().forEach(function(entry) {
    var entryName = entry.entryName;
    var decompressedData = zip.readFile(entry); // decompressed buffer of the entry
    files.push({'fileName':entryName,'data':decompressedData})

});
resolve(files);
}
catch(e){
  reject(new Error("Error while unzipping subtitle+\n"+e));
}

})
}


module.exports=unzip_sub_buffer;
