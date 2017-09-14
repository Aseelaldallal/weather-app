
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);  
var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng; 
    var weatherUrl = `https://api.darksky.net/forecast/61a32862133a149b136c4ef1133e02f7/${lat},${lng}?units=si`;
    console.log(response.data.results[0].formatted_address); 
    return axios.get(weatherUrl);
}).then((response) => {
   var temperature = response.data.currently.temperature;
   var feelsLike = response.data.currently.apparentTemperature;
   console.log(`The temperature is ${temperature}. It feels like ${feelsLike}`);
}).catch((e) => {
    if(e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    } else {
        console.log(e.message);
    }
});