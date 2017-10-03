const request = require('request');
const prompt = require('prompt');
const { wundergroundKey } = require('./env');


let state = "CO";
let city = "Denver";

function makeURL(state, city, key){
	return `http://api.wunderground.com/api/${key}/conditions/q/${state}/${city}.json`;
}

prompt.start();
prompt.get(['state', 'city'], function(err, result){
	if (err) throw err;

	let url = makeURL(result.state, result.city, wundergroundKey);

	request(url, function (error, response, body) {
	  try {

	  	let data = JSON.parse(body).current_observation;
	  	
	  	console.log('The weather in ' + data.display_location.full +' is ' + data.weather);
	  	console.log('The temp is ' + data.temp_f);

	  } catch(e) {
	  	console.log('error: ' + e);
	  }
	  
	});
});

