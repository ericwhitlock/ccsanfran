var Alloy = require('alloy');

var win = $.win;
var view = $.tv;
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

var populateTable = function(str){
	var obj = JSON.parse(str);
	var rows = [];
	
	var arr = [];
	
	for(comment in obj){
		var commentObject = obj[comment];
		if(parseInt(commentObject.status) == 1){
			arr.push(obj[comment]);
		}
	}
	
	arr.sort(function(a, b) {
	    var x = new Date(1000 * a.changed);
	    var y = new Date(1000 * b.changed);
	    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	});
	
	for(var i = 0; i < arr.length; i++){
		var row = Alloy.createController('commentRow', arr[i]).getView();
		rows.push(row);
	}
	
	view.setData(rows);
};

var populate = function(){
	var comments_json = Alloy.Globals.db.getValueByKey('node_' + nid + '_comments');
	if(comments_json == ''){
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
		populateTable(comments_json);
	}
	firstTime = false;
};

var updateFromNetwork = function(){
	if(!isUpdating){
		isUpdating = true;
	
		var xhr = Titanium.Network.createHTTPClient();
		
		var url = Alloy.Globals.REST_PATH + 'node/' + nid + '/comments.json';
		Ti.API.info('[comments][updateFromNetwork] url = ' + url);
		xhr.open("GET",url);
		
		xhr.onload = function() {
			Ti.API.info('[onload]');
			var statusCode = xhr.status;
		
			// Check if we have a xhr
			if(statusCode == 200) {
				
				// Save the responseText from the xhr in the response variable
				var response = xhr.responseText;
				Ti.API.info('comments: ' + response);
				// Parse (build data structure) the JSON response into an object (data)
				
				Alloy.Globals.db.updateValueByKey(response, 'node_' + nid + '_comments');
				populate();
				
				Alloy.Globals.db.updateValueByKey(now.toISOString(), 'last_update_comments_node_' + nid);
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


