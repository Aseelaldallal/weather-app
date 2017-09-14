// API KEY: 61a32862133a149b136c4ef1133e02f7


const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/61a32862133a149b136c4ef1133e02f7/${lat},${lng}?units=si`,
        json:true
    }, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            callback(undefined, {
               temperature: body.currently.temperature + " C",
               feelsLike: body.currently.apparentTemperature + " C"
            });
        } else {
            callback('Unable to fetch weather');
        }
    });
}

module.exports.getWeather = getWeather;