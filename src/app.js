const path = require('path');

const express = require('express');

const app = express();

const hbs = require('hbs');

const utils = require('./utils.js');

const port = process.env.PORT || 80;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public'); // access index file of application;
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static director to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Charles Kwadwo'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Charles Kwadwo'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Some useful help tips',
        author: 'Charles Kwadwo'
    });
});

app.get('/weather', (req, res) => {
    let searchAddress = req.query.address;
    searchAddress === undefined ? searchAddress = "Kumasi" : searchAddress;
    utils.coordinatesService(searchAddress, utils.weatherService, (weatherData) => {
        // res.render('weather',{
        //     'title':'Weather Report',
        //     'address':searchAddress,
        //     'author':'Charles Kwadwo'
        // })
        res.send({'weatherInfo': weatherData});
    });
});

app.get('/getWeatherServices', (req, res) => {
    const searchAddress = req.query.address;
    if (! searchAddress || searchAddress === '') {
        res.send({'error': 'You did not provide a search location'});
        return;
    }

    utils.coordinatesService(searchAddress, utils.weatherService, (weatherData) => {
        res.send(weatherData);
    });

});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        author: 'Charles Kwadwo'
    });
});

app.listen(port, () => {
    console.log('Server is up on port 80');
});

// git commands;
// git push -u origin main
