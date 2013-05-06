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
    	$.hang.hide();
    	$.tryAgain.visible = true;
		$.errorLabel.visible = true;
		$.hang.hide();
    }
};

var updateFromNetwork = function(){
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
			var result = JSON.parse(response);
			
			/**
			 * Create a new array "results"
			 * This is necessary because we need to create an object
			 * to send to the Table we're creating with the results
			 * the table will have the title and the nid of every result
			 * and we'll use the nid to move to another window when we click
			 * on it. 
			 */
			var results = new Array();
			
			// Start loop
			for(var key in result) {
				// Create the data variable and hold every result
				var data = result[key];
				
				/**
				 * To see how the array is built by Services in Drupal
				 * go to drupanium debug and use the views debug page
				 * you'll see that the array is something like:
				 * 
				 * 0 => array(
				 * 	title => some title
				 * 	date => some date
				 *  user => the user uid
				 *  type => the node type
				 *  nid => the node nid
				 *  vid => the node vid
				 * )
				 */
				
				// Uncomment the next line to see the full object in JSON format 
				// alert(result[key]); 
				
				// Store this pastor in the db
				Alloy.Globals.db.addPastor(data); // data = {uid, field_profile_full_name, field_photo});
					
				
				/**
				 * We start adding the results one by one to our array "results"
				 * it consists of title, nid and the property hasChild 
				 * in title we get the node title with data.title
				 * in nid we save the node nid with data.nid (we walk the array)
				 */
				results[key] = {title: data.field_profile_full_name, hasChild:true, uid:data.uid};
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