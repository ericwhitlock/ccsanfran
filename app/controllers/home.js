var Alloy = require('alloy');

var win = $.win;
var view = $.web;
var now;
var isUpdating = false;
var firstTime = true;

// Called every time the user clicks the Pastors Tab
var init = function(){
	Ti.API.info('[pastors][init]');
	
	if(Ti.Network.online){
		if(Alloy.Globals.shouldUpdate('last_update_home_tab')){
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
	var home_html_body = Alloy.Globals.db.getValueByKey('home_html_body');
	if(home_html_body == ''){
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
		var html = '<html><head><style type="text/css">' + Alloy.Globals.HTML_STYLE + '</style></head><body>' + home_html_body + '</body></html>';
		view.setHtml(html);
	}
	firstTime = false;
};

var updateFromNetwork = function(){
	if(!isUpdating){
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
				
				var bodyHtml = '<h1>' + data.title + '</h1>' + data.body.und[0].value;
				
				Alloy.Globals.db.updateValueByKey(bodyHtml, 'home_html_body');
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
	}
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