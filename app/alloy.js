// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
Alloy.Globals.REST_PATH = 'http://poimen.enjoycreativity.com/api/rest/';
Alloy.Globals.SITE_PATH = 'http://poimen.enjoycreativity.com/';

Alloy.Globals.MAX_BLOGS = 5;
Alloy.Globals.blogsShowingIndex = 0;

var _database = require('db');
Alloy.Globals.db = new _database();

// This will check to see if we need to check for an update from the network
Alloy.Globals.shouldUpdate = function(key, minutes){
	var shouldCheckForUpdates = false;
	
	var val = Alloy.Globals.db.getValueByKey(key);
	if(val == ''){
		shouldCheckForUpdates = true;
	}else{
		var lastDate = new Date(val);
		var now = new Date();
		var diff = now - lastDate;
		var diffInMinutes = (diff/1000)/60;
		
		var timeRequirement = (minutes) ? minutes : 30;
		
		if(diffInMinutes > timeRequirement){
			Ti.API.info('We should check for updates! diffInMinutes = ' + diffInMinutes);
			shouldCheckForUpdates = true;
		}else{
			Ti.API.info('No need to check for updates. diffInMinutes = ' + diffInMinutes);
		}
	}
	
	return shouldCheckForUpdates;
};

Alloy.Globals.alertNoConnection = function(){
	alert('No internet connection detected.');
};
