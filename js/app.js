var projectUhr = {};

//Caching


//Variables
var query1 = 'new york';
var query2; 
var query3; 
var query4;

//Store Lat and Lng results as object in a variable
var queryResults;

//API Key
apiKey = "AIzaSyCWNRpeC3rsU6G_xauGKDSo0ZpCEWiGcKw";


//----------------------------------------------------------------
//Init Function
projectUhr.init = function() {
	projectUhr.getLocation();

};


//----------------------------------------------------------------
//Find Current Date in Seconds (required for Google Time Zone API)





//----------------------------------------------------------------
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
			queryResults = response.results[0].geometry.location.lat + ',' + response.results[0].geometry.location.lng;
			queryResults.toString();

			projectUhr.getTimezone(queryResults);

		}
	});	
};


//----------------------------------------------------------------
//Query Google Time Zone API
projectUhr.getTimezone = function(searchForThis) {
	$.ajax({
		url: 'https://maps.googleapis.com/maps/api/timezone/json?location='+searchForThis+'&timestamp=1331161200',
		type: 'GET',
		data: {
			key: apiKey,
		},
		dataType: 'json',
		success: function(response){
			//view query results	
			console.log(response);

		}

	});
}

//----------------------------------------------------------------
//Convert Timezone to Current Time




//----------------------------------------------------------------
//Display Current Time







//Run projectUhr
$(function(){
	projectUhr.init();
});






