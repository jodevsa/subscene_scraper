var request=require('request');
var cheerio=require('cheerio');

var options={
url:'https://u.subscene.com/filter?',
method:'GET'


}
var json={};
request(options,function(err,res,body){

$=cheerio.load(body);
//console.log($('form').eq(1).children('.col-md-3').children('.checkbox').eq(0).text());
$('form').eq(1).children('.col-md-3').children('.checkbox').map(function(n,el){
language=$(el).text().trim().toLowerCase().replace(' ','');
value=$(el).children('label').children('input').attr('value').trim();
json[language]=value;




})
console.log(json);
var o=JSON.stringify(json);
var fs=require('fs');
var x=o.split(',');
x.map(function(n,ele){
fs.appendFile('lang.txt',n+',\n');

});
});
