'use strict';

function location(name, location, latitude, longitude) {
    this.search_query = name,
        this.formatted_query = location,
        this.latitude = latitude,
        this.longitude = longitude
}
function weather(description, valid_date) {
    this.forecast = description,
        this.time = valid_date;
}

const PORT = 3000; 
const express = require('express'); 
const cors = require('cors'); 

const app = express(); 
app.use(cors()); 

app.get('/location', handleLocation);

app.get('/weather', handleWeather);

function handleLocation(request, response) {
    
    const getLocation = require('./data/location.json');
    const city = request.query.city; 
   
    let obj = {
        name: getLocation[0].display_name,
        formatted_query: city,
        city : city,
        latitude: getLocation[0].lat,
        longitude: getLocation[0].lon
    };
    
    response.send(obj);
}

function handleWeather(request, response) {
    
    const data = require('./data/weather.json');
    const name = data.city_name;
    const weatherResponse = [];
    weather.forEach(item=> {
        const current = item.weather;
        weatherResponse.push({
            code : current.code,
            icon: current.icon,
            description: current.description
        });
    });
    response.send(weatherResponse);
}

app.listen(PORT, ()=> console.log(`App is running on Server on port: ${PORT}`))