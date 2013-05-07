var Alloy = require('alloy');

var win = $.win;
var view = $.web;

// Public Vars
exports.window = win;

// Passed Arguments
var args = arguments[0] || {};
var nid = args.nid || '';
var title = args.title || '';
var body = args.body || '';

var bComments = Ti.UI.createButton({title:'Comments'});
bComments.addEventListener('click', function(e){
	
});
win.rightNavButton = bComments;

var firstTime = true;
var isUpdating = false;
var now;

// Called every time the user clicks the Blog Tab
var init = function(){
	Ti.API.info('[blog][init]');
	
	if(Ti.Network.online){
		if(Alloy.Globals.shouldUpdate('last_update_blog_node_' + nid)){
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
	view.setHtml('<h1>' + title + '</h1>' + body);
	
	var node_data_string = Alloy.Globals.db.getValueByKey('blog_data_node_' + nid);
	if(node_data_string != ''){
		var node_data = JSON.parse(node_data_string);
		var total_comments_string = node_data.comment;
		var total_comments = parseInt(total_comments_string);
		
		if(total_comments > 0){
			
		}
	}
	
	firstTime = false;
};

var updateFromNetwork = function(){
	if(!isUpdating){
		isUpdating = true;
	
		// Define the url which contains the full url
		// See how we build the url using the win.nid which is 
		// the nid property we pass to this file when we create the window
		var url = Alloy.Globals.REST_PATH + 'node/' + nid + '.json';
		
		// Create a connection inside the variable xhr
		var xhr = Titanium.Network.createHTTPClient();
		
		// Open the xhr
		xhr.open("GET",url);
		
		xhr.onerror = function(){
			handleError();
		};
		
		// When the xhr loads we do:
		xhr.onload = function() {
			// Save the status of the xhr in a variable
			// this will be used to see if we have a xhr (200) or not
			var statusCode = xhr.status;
			
			// Check if we have a xhr
			if(statusCode == 200) {
				// Save the responseText from the xhr in the response variable
				var response = xhr.responseText;
				
				Alloy.Globals.db.updateValueByKey(response, 'blog_data_node_' + nid);
				populate();
				Alloy.Globals.db.updateValueByKey(now.toISOString(), 'last_update_blog_node_' + nid);
				isUpdating = false;
				now = null;
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
};

var tryAgain = function(){
	$.tryAgain.visible = false;
	$.errorLabel.visible = false;
	isUpdating = false;
	updateFromNetwork();
};