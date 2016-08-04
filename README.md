# Project Name

### subscene_scraper
![alt tag](http://i.imgur.com/u9Q0Hyn.png)

## changelog v1.2.0
* #### re-written from scratch with promises.
* #### all languages supported by subscene.com are supported
* #### fixed various bugs.
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
* ##### npm install progress
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



### example(3)

#### downloading subtitles for all movies in a current directory
##### originally subscene_scraper was developed to download multiple subtitles at the same time and this is where it comes handy  in
##### what you will need to get started:
* ##### npm install chalk        (for command line styling)
* ##### npm install async
* ##### npm install asyncdirectory (created by us used to search for all movies in directory)
* ##### npm install video-extensions
#### code:
    var chalk = require('chalk');
    var async = require('async');
    var success=0;
    var path=require('path');
    var getsubtitleLink=require('subscene_scraper');
    var  dir_Search= require('asyncdirectory');
    var len;
    var para="c:\\movie";
    //first parameter is used to state which directory you want to download subtitles to
    //second parameter adds movie extenstions that are needed to be searched for
    dir_Search.getList("c:\\movie",["mp4","mkv","avi"],function(movieNameList){
    len=movieNameList.length;
    if(len<1){
    console.log(chalk.inverse("ERROR DETECTED:"));
    console.log("\n",chalk.bgRed("Error   "),chalk.bgYellow("0")," Movies detected in",para.toString().toUpperCase());
    process.exit(0);
    }
    console.log(chalk.inverse(chalk.bgGreen("Movies Detected"),movieNameList.length-1));
    console.log(chalk.bgGreen("\nretriving..."));
    async.times(movieNameList.length-1,function(n,next){
        var movieName=path.basename(movieNameList[n],path.extname(path.basename(movieNameList[n])));
        var moviePath=path.dirname(movieNameList[n]);


        getsubtitleLink(movieName,"english",moviePath,function(err,fileName,data){

        if(err){

            console.log("\n ",chalk.bgRed("  ERROR: "),"retriving subtitle for movie:",chalk.bgYellow(movieName),"lang:english    from db");
            return;
        }

        console.log("\n ",chalk.bgGreen(" SUCCESS:")," subtitle file for",chalk.bgYellow(movieName),"lang:english     has been Downloaded.");
        success=success+1;
        });
    });
    }) ;

    process.on('exit',function(){
    console.log("\n\n\n",chalk.inverse("      #info:      "),"\n","\n   DOWNLOADED",chalk.blue(success),"OUT OF",chalk.blue(len-1));
    });

### contact us at :jodevsa@gmail.com / ahmadkhaldi94@gmail.com
