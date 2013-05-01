var Alloy = require('alloy');

var win = $.win;
var view = $.web;

// Public Vars
exports.window = win;

// Passed Arguments
var args = arguments[0] || {};
var uid = args.uid || '';
var title = args.title || '';


var init = function(){
	Ti.API.info('[pastorNode][init]');
	refresh();
};

var refresh = function(){
	
	var url = Alloy.Globals.REST_PATH + 'user/' + uid + '.json';

	var xhr = Titanium.Network.createHTTPClient();

	// Open the xhr
	xhr.open("GET",url);
	
	xhr.onerror = function(err){
		handleError();
	}
	
	// When the xhr loads we do:
	xhr.onload = function() {
		// Save the status of the xhr in a variable
		// this will be used to see if we have a xhr (200) or not
		var statusCode = xhr.status;
		
		// Check if we have a xhr
		if(statusCode == 200) {
			$.errorLabel.visible = false;
			
			// Save the responseText from the xhr in the response variable
			var response = xhr.responseText;
			
			// Parse (build data structure) the JSON response into an object (data)
			var data = JSON.parse(response);
			
			// ensure that the window title is set
			win.title = data.title;
			
			var bodyHtml = '<html><head><title>Sample HTML</title><link rel="stylesheet" href="/includes/styles.css" type="text/css" /></head><body><div class="webview">';
			bodyHtml = bodyHtml + '<h1>' + data.field_profile_full_name.und[0].safe_value + '</h1>' + data.field_profile_vision.und[0].safe_value;
			bodyHtml = bodyHtml + '</div></body></html>';
			
			// Add bodyHtml labels to our view
			view.setHtml(bodyHtml);
			
		} // End the statusCode 200 
		else {
			handleError();
		}
	}
	
	xhr.send();
};

var handleError = function(){
	$.errorLabel.visible = true;
};
