var Alloy = require('alloy');

var win = $.win;
var view = $.web;

var init = function(){
	Ti.API.info('[home][init]');
	refresh();
};

var refresh = function(){
	Ti.API.info('[home][refresh]');
	$.errorLabel.visible = false;
	
	var xhr = Titanium.Network.createHTTPClient();
	
	var url = Alloy.Globals.REST_PATH + 'node/9' + '.json';
	Ti.API.info('[home][refresh] url = ' + url);
	xhr.open("GET",url);
	
	xhr.onload = function() {
		Ti.API.info('[onload]');
		var statusCode = xhr.status;
	
		// Check if we have a xhr
		if(statusCode == 200) {
			
			// Save the responseText from the xhr in the response variable
			var response = xhr.responseText;
			
			// Parse (build data structure) the JSON response into an object (data)
			var data = JSON.parse(response);
			
			var bodyHtml = '<html><head><title>Sample HTML</title><link rel="stylesheet" href="../../styles/styles.css" type="text/css" /></head><body><div class="webview">';
			bodyHtml = bodyHtml + '<h1>' + data.title + '</h1>' + data.body.und[0].value;
			bodyHtml = bodyHtml + '</div></body></html>';
			
			Ti.API.info('bodyHTML = ' + bodyHtml);
			
			// Add bodyHtml labels to our view
			view.setHtml(bodyHtml);
		}
		else {
			handleError();
		}
	}
	
	xhr.onerror = function(err){
		handleError();
	};
	xhr.send();
};

var handleError = function(){
	$.errorLabel.visible = true;
};




