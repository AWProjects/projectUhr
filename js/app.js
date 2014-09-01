var projectUhr = {};

//Caching
var $location1 = $('#location1');

//Variables
var query1;
var query2; 
var query3; 
var query4;

//Offsets for each location
var timeZone1;
var timeZone2;
var timeZone3;
var timeZone4;

//Store Lat and Lng results as object in a variable
projectUhr.queryResults;

var timezoneResult;

//----------------------------------------------------------------
//Find Current Date in Seconds (required for Google Time Zone API)
//Uses momentjs
var currentDateinSeconds = moment()/1000;
var currentDate = moment().format();

//API Key
apiKey = "AIzaSyCWNRpeC3rsU6G_xauGKDSo0ZpCEWiGcKw";

//----------------------------------------------------------------
//Init Function
projectUhr.init = function() {
	
	//Reset currentDate if it is inaccurate
	if(!(currentDateinSeconds === moment()/1000)) {
		currentDateinSeconds = moment()/1000;
	}

	// hit enter to input
	$('.location').keypress(function (e) {
	  if (e.which == 13) {
	    $location1.submit();
	    query1 = $('#location1').val();
	    projectUhr.getLocation(query1);
	    return false;    //<---- Add this line
	  }
	});

	// $location1.on('submit', function(e){
	// 	e.preventDefault();
	// 	projectUhr.getLocation(query1);
	// 	console.log('submitted!');		
	// });
	

	
};


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
			console.log(response);

			//store results in variable, formatted for Time Zone API
			queryResults = response.results[0].geometry.location.lat + ',' + response.results[0].geometry.location.lng;
			queryResults.toString();
			console.log(queryResults);

			//Get Time Zone for queried location
			projectUhr.getTimezone(queryResults,currentDateinSeconds);

		}
	});	
};


//----------------------------------------------------------------
//Query Google Time Zone API
projectUhr.getTimezone = function(searchForLocation,searchforTime) {
	$.ajax({
		url: 'https://maps.googleapis.com/maps/api/timezone/json?location='+searchForLocation+'&timestamp='+searchforTime,
		type: 'GET',
		data: {
			key: apiKey,
		},
		dataType: 'json',
		success: function(response){
			//view query results	
			console.log(response);
			var timeZone1 = response.timeZoneId;
			console.log(timeZone1);
		}

	});
};

//----------------------------------------------------------------
//Convert Timezone to Current Time
projectUhr.getCurrentTime = function(searchforThis) {


};



//----------------------------------------------------------------
//Display Current Time
projectUhr.displayCurrentTime = function(searchForThis) {

};



//----------------------------------------------------------------
//on submit, run the queries 
projectUhr.runQuery = function() {

	// $location1.on('change', function(){
	// 	projectUhr.getLocation($location1.val());
	// 	console.log('submitted!');			
	// });
};


//Run projectUhr
$(function(){
	projectUhr.init();
});






