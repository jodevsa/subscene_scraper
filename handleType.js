var handleTitle=require('./handleTitle');
var handleRelease=require('./handleRelease');

function handleType(data){
//console.log(data)
if(data.type=='release'){
 return new handleRelease(data);
}
else{

return new handleTitle(data)
}

}


module.exports=handleType;
