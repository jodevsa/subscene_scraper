var {
  passiveDownloader
} = require("../src/main.js")
var os = require('os');
var fs = require('fs');
test('it should download subtitle to disk when 3 parameters are invoked', () => {
  return passiveDownloader('interstellar', 'english', os.tmpdir()).then((files) => {
    for (let file of files) {
      expect(fs.existsSync(file)).toBe(true);
    }
  });
},5000);

test('passiveDownloader should return buffer when  2 parameters are invoked', () => {
  return passiveDownloader('interstellar', 'english').then((subtitleFiles) => {
    for (let file of subtitleFiles) {
      expect(Buffer.isBuffer(file.buffer)).toBe(true);
    }
  });
},5000);
