var Alloy = require('alloy');

var win = $.win;
var view = $.web;
var now;
var isUpdating = false;
var firstTime = true;

// Public Vars
exports.window = win;

// Passed Arguments
var args = arguments[0] || {};
var uid = args.uid || '';
var image = args.image || '';
var title = args.title || '';
win.title = title;

// Called every time the user opens this pastor node
var init = function(){
	Ti.API.info('[pastorNode][init]');
	
	if(Ti.Network.online){
		if(Alloy.Globals.shouldUpdate('last_update_pastornode_' + uid)){
			if(firstTime){
				firstTime = false;
				$.hang.show();
			}
			updateFromNetwork();
		}else{
			populate();
		}
		
	}else{
		populate();
	}
	
};

var updateFromNetwork = function(){
	isUpdating = true;
	var url = Alloy.Globals.REST_PATH + 'user/' + uid + '.json';

	var xhr = Titanium.Network.createHTTPClient({timeout:20000});

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
			
			// Parse (build data structure) the JSON response into an object (data)
			var data = JSON.parse(response);
			
			var bodyHtml = '<html><head><title>Sample HTML</title><link rel="stylesheet" href="/includes/styles.css" type="text/css" /></head><body><div class="webview">';
			bodyHtml = bodyHtml + '<image src= "' + image + '"' + ' width="200" height="200" style="display: block; margin: 0 auto;"/><br/>' + data.field_profile_vision.und[0].safe_value;
			bodyHtml = bodyHtml + '</div></body></html>';
			
			// Save this pastor node
			Alloy.Globals.db.updateValueByKey(bodyHtml, 'pastor_node_body_' + uid);
			populate();
			Alloy.Globals.db.updateValueByKey(now.toISOString(), 'last_update_pastornode_' + uid);
			now = null;
			isUpdating = false;
			
		} // End the statusCode 200 
		else {
			handleError();
		}
	}
	
	var now = new Date();
	xhr.send();
};

var populate = function(){
	var bodyHtml = Alloy.Globals.db.getValueByKey('pastor_node_body_' + uid);
	if(bodyHtml == ''){
		$.errorLabel.visible = true;
		$.tryAgain.visible = true;
		$.hang.hide();
	}else{
		$.errorLabel.visible = false;
		$.tryAgain.visible = false;
		$.hang.hide();
		view.setHtml(bodyHtml);
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