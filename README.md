# Project Name

### subscene_scraper
#
#
![alt tag](http://i.imgur.com/8KzPIxv.jpg)
[subd](https://www.npmjs.com/package/subscene_scraper-cli) command

## changelog v1.2.1
#### re-written from scratch with promises.
#### all languages supported by [subscene.com](https://subscene.com/) are now supported.
#### fixed various bugs.
#### increased timeout for all requests.
## Installation

### npm install subscene_scraper

## Usage:


### example(1)
##### download a subtitle for a movie in our current working directory
#### code:
    var subscene_scraper=require('subscene_scraper');
    var path=process.cwd()+"\\";

    //all languages supported by subscene.com are now supported.

    subscene_scraper('12.Years.a.Slave.2013.720p.DVDSCR.x264.AC3-AVeNGeRZ','english',path,
	function(err,savedPath,data){
    if(err){

        console.log("error"+err);
        return;
	}

    //savedPath returns location of saved subtitle
    console.log("Subtitle downloaded at",savedPath);
    });

### example(2)
##### adding a download progress bar !
#### what you will need to get started:
 ##### npm install progress
#### code:
    var subscene_scraper=require('subscene_scraper');
    var path=process.cwd()+"\\";
    var ProgressBar = require('progress');
    var bar;

    subscene_scraper('interstellar','english',path,function(err,savedPath,data){
        if(err){
        console.log("subtitle not found or language not supported");
        return;
        }

        console.log("Subtitle downloaded at",savedPath);
    }).on('start',function(size){
        bar=new ProgressBar('  downloading [:bar] :percent :etas', {
        total:size,
        complete: '=',
        incomplete: ' ',
        width: 20,
        });
    }).on('data',function(data){
        bar.tick(data.length);

    });
