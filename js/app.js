var projectUhr = {};

//Caching


//Variables
var query1 = 'new york';
var query2; 
var query3; 
var query4;

//Store Lat and Lng results as object in a variable
var queryResults;





//----------------------------------------------------------------

//API Key
apiKey = "AIzaSyCWNRpeC3rsU6G_xauGKDSo0ZpCEWiGcKw";

projectUhr.init = function() {
	projectUhr.getLocation(query1);
};


//Query Google Geocoder API

projectUhr.getLocation = function(searchForThis) {
	$.ajax({
		url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + searchForThis,
		type: 'GET',
		data: {
			key: apiKey,
		},
		dataType: 'json',
		success: function(response){
			//view query results	
			// console.log(response.results[0].geometry.location);

			//store only the first result in a variable
			queryResults = response.results[0].geometry.location;
			console.log('queryresults are ' + queryResults.lat + ' and ' +  queryResults.lng);

		}
	});	
};




$(function(){
	projectUhr.init();
});