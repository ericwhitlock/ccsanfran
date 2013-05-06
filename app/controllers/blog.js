var Alloy = require('alloy');

var nav = $.nav;
var win = $.blogWin;
var table = $.tv;
var tab = null;
var now;
var isUpdating = false;
var firstTime = true;

exports.setParentTab = function(pTab){
	tab = pTab;
};

// Called every time the user clicks the Blog Tab
var init = function(){
	Ti.API.info('[blog][init]');
	
	if(Ti.Network.online){
		if(Alloy.Globals.shouldUpdate('last_update_blog_tab')){
			if(firstTime){
				firstTime = false;
				$.hang.show();
			}
			updateFromNetwork();
		}else{
			populateTable();
		}
		
	}else{
		populateTable();
	}
	
};

var updateFromNetwork = function(){
	if(!isUpdating){
		isUpdating = true;
		var url = Alloy.Globals.SITE_PATH + 'blog/api/json';
		var xhr = Titanium.Network.createHTTPClient({timeout:20000});
		xhr.open("GET",url);
	
		xhr.onerror = function(){
			handleError();	
		};
		
		xhr.onload = function() {
			// Save the status of the xhr in a variable
			// this will be used to see if we have a xhr (200) or not
			var statusCode = xhr.status;
			
			// Check if we have a xhr
			if(statusCode == 200) {
				// Save the responseText from the xhr in the response variable
				var response = xhr.responseText;
				
				Alloy.Globals.db.updateValueByKey(response, 'blog_json');
				populateTable();
				Alloy.Globals.db.updateValueByKey(now.toISOString(), 'last_update_blog_tab');
				isUpdating = false;
				now = null;
				
				var arr = JSON.parse(response);
				for(var i=0; i < arr.length; i++){
					var nid = arr[i].nid.toString();
					Alloy.Globals.blogs[nid] = arr[i];
				}
			}
			else {
				// Create a label for the node title
				handleError();
			}
		};
		
		now = new Date();
		xhr.send();
	}
}

var populateTable = function(){
	var blogJSON = Alloy.Globals.db.getValueByKey('blog_json');
	if(blogJSON == ''){
		$.tryAgain.visible = true;
		$.errorLabel.visible = true;
		$.hang.hide();
	}else{
		$.hang.hide();
		$.tryAgain.visible = false;
		$.errorLabel.visible = false;
		var arr = JSON.parse(blogJSON);
		table.setData(arr);
	}
};

var onTableClick = function(e){
	var node = Alloy.createController('blogNode', {nid: e.rowData.nid, title:e.rowData.title});
	
	tab.open(node.window);
};

var handleError = function(){
	isUpdating = false;
	populateTable();
};

var tryAgain = function(){
	$.hang.show();
	$.tryAgain.visible = false;
	$.errorLabel.visible = false;
	isUpdating = false;
	updateFromNetwork();
};
