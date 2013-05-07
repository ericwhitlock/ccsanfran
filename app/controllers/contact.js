var Alloy = require('alloy');

var win = $.win;
var view = $.web;
var now;
var firstTime = true;
var isUpdating = false;

// Called every time the user clicks the Pastors Tab
var init = function(){
	Ti.API.info('[pastors][init]');
	
	if(Ti.Network.online){
		if(Alloy.Globals.shouldUpdate('last_update_contact_tab')){
			if(firstTime){
				populate();
			}
			updateFromNetwork();
		}else{
			populate();
		}
		
	}else{
		populate();
	}
	
};

var populate = function(){
	var contact_data_string = Alloy.Globals.db.getValueByKey('contact_json');

	if(contact_data_string == ''){
		if(firstTime){
			$.hang.show();
		}else{
			$.tryAgain.visible = true;
			$.errorLabel.visible = true;
			$.hang.hide();
		}
	}else{
		$.tryAgain.visible = false;
		$.errorLabel.visible = false;
		$.hang.hide();
		var contact_data = JSON.parse(contact_data_string);
		
		var bodyHtml = '<html><head><title>Sample HTML</title><link rel="stylesheet" href="styles.css" type="text/css" /></head><body><div class="webview">';
		bodyHtml = bodyHtml + '<h1>' + contact_data.title + '</h1>' + contact_data.body.und[0].value;
		bodyHtml = bodyHtml + '</div></body></html>';
		view.setHtml(bodyHtml);
	}
	
	firstTime = false;
};

var updateFromNetwork = function(){
	if(!isUpdating){
		isUpdating = true;
		
		var url = Alloy.Globals.REST_PATH + 'node/5' + '.json';

		// Create a connection inside the variable xhr
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
				// Save the responseText from the xhr in the response variable
				var response = xhr.responseText;
				
				var contact_data_string = Alloy.Globals.db.updateValueByKey(response, 'contact_json');
				
				Alloy.Globals.db.updateValueByKey(now.toISOString(), 'last_update_contact_tab');
				populate();
				isUpdating = false;
			}
			else {
				handleError();
			}
		}
		
		now = new Date();
		xhr.send();
	}
	
};

var handleError = function(){
	isUpdating = false;
	populate();
};

var tryAgain = function(){
	$.hang.show();
	$.tryAgain.visible = false;
	$.errorLabel.visible = false;
	isUpdating = false;
	updateFromNetwork();
};