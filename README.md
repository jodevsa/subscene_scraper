# Project Name

### subscene_scraper
#
#
[![asciicast](https://asciinema.org/a/1TwTvEdgZGUbJRZIORIGJr0ey.png)](https://asciinema.org/a/1TwTvEdgZGUbJRZIORIGJr0ey)
[subd](https://github.com/jodevsa/subd) command

## changelog v1.3.5
#### re-written  in ES7
#### fixed various bugs.
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

    subscene_scraper.passiveDownloader('interstellar','english',path)
    .then(function(savedFiles){
        console.log('subtitle saved to ',savedFiles);    
    })
    .catch(function(err){
    console.log('error:',err);
    });

### example(2)
##### Interactive downloader
    //title subtiles have 2 steps (1) chooseTitle (2) chooseRelease
    // release subtitles have 1 step (1) chooseRelease
    // you'll have to implement chooseTitleSubtitle,chooseReleaseSubtitle functions.
    const downloader = interactiveDownloader(movieName, language, saveLocation);
    downloader.on('info', async (info, choose) => {
      if (info.type === 'title') {
        // type === 'title'
        // chooseTitle (1)
        /// choose subtitle from info.result
        const result = choose(chooseTitleSubtitle(info.result));
        choose(result);
      } else {
        /// type === 'release'
        // chooseRelease (1)
        /// choose subtitle from info.result
        choose(chooseReleaseSubtitle(info.result));
      }
    }).on('title', async (list, choose) => {
      // chooseRelease (2)
      const result = chooseReleaseSubtitle(list);
      choose(result);
    }).on('done', (result, movieName) => {
      console.log('Downloaded Subtitle at', result)
    })
