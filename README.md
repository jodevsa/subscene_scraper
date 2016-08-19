# Project Name

### subscene_scraper
#
#
![alt tag](http://i.imgur.com/8KzPIxv.jpg)
[subd](https://www.npmjs.com/package/subscene_scraper-cli) command

## changelog v1.2.5
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

    // for example we will download the subtitle file at current working directory
    var path=process.cwd();

    //all languages supported by subscene.com are now supported.

    subscene_scraper('interstellar','english',path,function(err,savedPath,data){
      if(err){

        console.log("error"+err);
        return;
	  }

    //savedPath returns location of saved subtitle
    console.log("Subtitle downloaded at",savedPath);
    });
