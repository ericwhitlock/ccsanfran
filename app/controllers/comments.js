var Alloy = require('alloy');

var win = $.win;
var view = $.web;
var now;
var isUpdating = false;
var firstTime = true;

// Passed Arguments
var args = arguments[0] || {};
var tab = args.tab || '';
var nid = args.nid || '';


// Called every time the user clicks the Pastors Tab
var init = function(){
	Ti.API.info('[comments][init]');
	
	if(Ti.Network.online){
		updateFromNetwork();
	}else{
		populate();
	}
	
};

var populate = function(){
/*	var home_html = Alloy.Globals.db.getValueByKey('home_html');
	if(home_html == ''){
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
		view.setHtml(home_html);
	}
	firstTime = false;*/
};

var updateFromNetwork = function(){
/*	if(!isUpdating){
		isUpdating = true;
	
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
				
				Alloy.Globals.db.updateValueByKey(bodyHtml, 'home_html');
				populate();
				
				Alloy.Globals.db.updateValueByKey(now.toISOString(), 'last_update_home_tab');
				now = null;
				isUpdating = false;
			}
			else {
				handleError();
			}
		}
		
		xhr.onerror = function(err){
			handleError();
		};
		
		now = new Date();
		xhr.send();
	}*/
};

var handleError = function(){
	isUpdating = false;
	populate();
};

var tryAgain = function(){
	$.tryAgain.visible = false;
	$.errorLabel.visible = false;
	$.hang.show();
	isUpdating = false;
	updateFromNetwork();
};


