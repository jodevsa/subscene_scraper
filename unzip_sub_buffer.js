var AdmZip = require('adm-zip');
var Promise = require("bluebird");


function unzip_sub_buffer(data){
return new Promise(function(resolve,reject){
  try{
var zip = new AdmZip(data.data);
var files=[]
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
