var download = require("../src/download_subtitle.js").default;
var h = require('crypto').createHash('sha256')
test('it will download a file.', () => {
  return download("https://subscene.com/subtitles/arabic-text/zk3UnadbOX3PmcanliEsJ1u4v-xdc88Eynjxc034RF3OVOUB7i6X36xhbSqQi03SHbPROjf6nEUtllmrozaQPybXmht0UuCye7bynDFkuDk9NtI4tqSZypa7COHffMhI0").then(function(data) {
  });

});

test('it will download the specified file.', () => {
  const hash = '2142befbe21319ab21bcec13c6227df412a4a82108b7e930087a6dc2c8096942';
  const url="https://subscene.com/subtitles/arabic-text/zk3UnadbOX3PmcanliEsJ1u4v-xdc88Eynjxc034RF3OVOUB7i6X36xhbSqQi03SHbPROjf6nEUtllmrozaQPybXmht0UuCye7bynDFkuDk9NtI4tqSZypa7COHffMhI0";
  return download(url).then((data)=> {
    h.update(data.buffer);
    const bufferHash = h.digest('hex');
    expect(bufferHash).toBe(hash);
  });

});
