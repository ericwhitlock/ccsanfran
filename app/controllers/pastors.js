var Alloy = require('alloy');

var win = $.win;
var table = $.tv;
var tab = null;
var now;
var isUpdating = false;
var firstTime = true;

exports.setParentTab = function(pTab){
	tab = pTab;
};

// Called every time the user clicks the Pastors Tab
var init = function(){
	Ti.API.info('[pastors][init]');
	
	if(Ti.Network.online){
		if(Alloy.Globals.shouldUpdate('last_update_pastors_tab')){
			if(firstTime){
				populateTable();
			}
			updateFromNetwork();
		}else{
			populateTable();
		}
		
	}else{
		populateTable();
	}
	
};

function populateTable() {
 
    var pastorCollection = Alloy.Globals.db.getPastors();
 
    if(pastorCollection.length > 0){
    	$.hang.hide();
    	$.tryAgain.visible = false;
		$.errorLabel.visible = false;
    	var rows = [];
    	for (var i = 0; i < pastorCollection.length; i++) {
	        var data = pastorCollection[i];
	        var row = Alloy.createController('pastorRow', data).getView();
	        rows.push(row);
	    }
	 
	    $.tv.setData(rows);
    }else{
    	if(firstTime){
    		$.hang.show();
    	}else{
    		$.tryAgain.visible = true;
			$.errorLabel.visible = true;
			$.hang.hide();
    	}
    }
    firstTime = false;
};

var updateFromNetwork = function(){
	if(!isUpdating){
		isUpdating = true;
	
		var url = Alloy.Globals.SITE_PATH + 'pastors/api/json';
		Ti.API.info('[pastors][updateFromNetwork] url = ' + url);
		// Create a connection inside the variable xhr
		var xhr = Titanium.Network.createHTTPClient({timeout:20000});
		
		// Open the xhr
		xhr.open("GET",url);
		
		xhr.onerror = function(err){
			handleError();
		};
		
		xhr.onload = function() {
			var statusCode = xhr.status;
			
			// Check if we have a xhr
			if(statusCode == 200) {
				// Save the responseText from the xhr in the response variable
				var response = xhr.responseText;
				
				// Parse (build data structure) the JSON response into an object (data)
				var result = JSON.parse(response);
				
				for(var key in result) {
					// Create the data variable and hold every result
					var data = result[key];
					
					Alloy.Globals.db.addPastor(data); // data = {uid, field_profile_full_name, field_photo});
				}
				populateTable();
				
				Alloy.Globals.db.updateValueByKey(now.toISOString(), 'last_update_pastors_tab');
				now = null;
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

var onTableClick = function(e){
	var node = Alloy.createController('pastorNode', {uid: e.rowData.uid, title:e.rowData.field_profile_full_name, image:e.rowData.field_photo});
	tab.open(node.window,{animated:true});
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