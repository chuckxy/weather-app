const request = require('request');

const getWeatherService = (latitude, longitude, responseFunc) => {
    const url = 'http://api.weatherstack.com/current?access_key=5f5c4ddf81a14f647f6768ef62bdf35c&query=' + latitude + ',' + longitude;
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            responseFunc({'error': 'No connection to server'});
        } else if (response.body.error) {
            console.log(response.body);
            responseFunc({
                'error': response.body.error.info + ' (Weather Stack!)'
            });
        } else {
            const data = response.body.current;
            const temp = data.temperature;
            const feelsLike = data.feelslike;
            const castDesc = data.weather_descriptions[0];
            const location = response.body.location;
            responseFunc({'temperature': temp, 'feelsLike': feelsLike, 'weatherDesc': castDesc, 'location': location})
        }

    });
}

const getCoordinates = (search, weatherServiceFunc, responseFunc) => {
    const locationURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURI(search) + ".json?access_token=pk.eyJ1IjoiY2hhcnN5MjAwNSIsImEiOiJjbDRidmNxNjgwMGhwM2NzNnVzaHFrYzN1In0.F5xLyf44ID4mDC_0Vp5X1w&limit=1";
    request({
        url: locationURL,
        json: true
    }, (error, response) => {
        if (error) {
            responseFunc({'error': 'No connection to server'});
        } else if (response.body.features.length === 0) {
            responseFunc({'error': 'Please input a valid location to search'}); // call back function sends error messgae;
        } else {
            const coordinates = response.body.features[0].geometry.coordinates;
            const place = response.body.features[0].place_name;
            weatherServiceFunc(coordinates[1], coordinates[0], responseFunc);
        }

    });
}

module.exports = {
    weatherService: getWeatherService,
    coordinatesService: getCoordinates
}
