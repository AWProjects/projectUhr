var projectUhr = {};

//Caching
var $location1 = $('#location1');
var $location2 = $('#location2');
var $location3 = $('#location3');
var $location4 = $('#location4');

//Variables
var queries = ['','','',''];
//Store Timezone names for each location
var timeZone1;
var timeZone2;
var timeZone3;
var timeZone4;

//Store Lat and Lng results as object in a variable
var queryResults;

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

	projectUhr.runQuery();

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
	// hit enter to input (one for each)
	$(document).on('keypress','.location',function (e) {
		$(this).parents('.quad').css('background','red');
	  if (e.which == 13) {
	    $(this).submit();
	    queries[$(this).attr('data-id')-1] = $(this).val();
	    projectUhr.getLocation(queries[$(this).attr('data-id')-1]);
	    return false;   
	  }
	});
};


//Run projectUhr
$(function(){
	projectUhr.init();
});






