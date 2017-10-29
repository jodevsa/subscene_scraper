var handleTitle = require('./handleTitle');
var handleRelease = require('./handleRelease');

function handleType(data) {

    if (data.type == 'release') {
        return handleRelease(data);
    } else {

        return handleTitle(data)
    }

}

module.exports = handleType;
