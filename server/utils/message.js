var moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt : moment().valueOf()
    }
};

var generateLocationMessage = (from, longitude, latitude) => {
    return {
        from,
        location_url : `https://www.google.com/maps/?q=${longitude},${longitude}`,
        createdAt : moment().valueOf()
    }
}

module.exports = { generateMessage, generateLocationMessage };