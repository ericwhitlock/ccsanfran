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
Alloy.Globals.REST_PATH = 'http://poimenministries.com/api/rest/';
Alloy.Globals.SITE_PATH = 'http://poimenministries.com/';
Alloy.Globals.MAX_BLOGS = 20;
Alloy.Globals.blogsShowingIndex = 0;
Alloy.Globals.timeout = 80000; // 80 seconds
Alloy.Globals.HTML_META = '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">';

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
		
		var timeRequirement = (minutes) ? minutes : 2;
		
		if(diffInMinutes >= timeRequirement){
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

Alloy.Globals.getReadableDateTime = function(d){
	var obj = {h:d.getHours(), m:d.getMinutes(), s:d.getSeconds()};
	var str = '';
	
	str += (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear() + '   ';
	
	var m = ' AM';
    var hour = obj.h;
	if(hour >= 12){
		hour = hour - 12;
		m = ' PM';
		if(hour == 0){
			hour = 12;
		}
	}
	
    if(hour > 0){
    	str += hour + ':';
    } 
    if(obj.m > 0){
    	if(obj.m > 9){
    		str += obj.m;
    	}else{
    		str += '0' + obj.m;
    	}
    }else{
    	str += '00';
    }
    
   
    str += m;
    
    return str;
};

//===================================
// Style Themes
//
// Only leave one theme uncommented
//===================================

//===============
// Yellow Theme
//===============

Alloy.Globals.TITLE_LABEL_COLOR = '#000000';//'#d15941';
Alloy.Globals.HTML_STYLE = 	'h1{font-size:22;font-family:Helvetica;} ' 
						+	'h4{font-size:18;font-family:Helvetica;} '
						+	'p{font-size:15;font-family:Helvetica;} '; 
//Alloy.Globals.HTML_STYLE = 	'h1{color:#d15941;font-size:22;font-family:Helvetica;} ' 
//						+	'h4{color:#516a0f;font-size:18;font-family:Helvetica;} '
//						+	'p{color:#74701e;font-size:15;font-family:Helvetica;} ';						

//===============
// Gray Theme
//===============
/*
Alloy.Globals.TITLE_LABEL_COLOR = '#000000';
Alloy.Globals.HTML_STYLE = 	'h1{color:#000000;font-size:22;font-family:Helvetica;} ' 
						+	'h4{color:#333333;font-size:18;font-family:Helvetica;} '
						+	'p{color:#666666;font-size:15;font-family:Helvetica;} '; 
*/					


