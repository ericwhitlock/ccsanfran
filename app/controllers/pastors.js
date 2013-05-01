var Alloy = require('alloy');

var win = $.win;
var table = $.tv;
var tab = null;

exports.setParentTab = function(pTab){
	tab = pTab;
};

var init = function(){
	Ti.API.info('[pastors][init]');
	refresh();
};

var refresh = function(){
	Ti.API.info('[pastors][refresh]');
	var url = Alloy.Globals.SITE_PATH + 'pastors/api/json';
	Ti.API.info('[pastors][refresh] url = ' + url);
	// Create a connection inside the variable xhr
	var xhr = Titanium.Network.createHTTPClient();
	
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
			$.errorLabel.visible = false;
			
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
				
				// Uncomment the next line to see an example of how to get the title of every result
				// alert(data.field_event_date);
				
				/**
				 * We start adding the results one by one to our array "results"
				 * it consists of title, nid and the property hasChild 
				 * in title we get the node title with data.title
				 * in nid we save the node nid with data.nid (we walk the array)
				 */
				results[key] = {title: data.field_profile_full_name, hasChild:true, uid:data.uid};
			}
			table.setData(results);
		}
		else {
			handleError();
		}
	}
	xhr.send();
};

var onTableClick = function(e){
	var node = Alloy.createController('pastorNode', {uid: e.rowData.uid, title:e.rowData.title});
	tab.open(node.window,{animated:true});
};

var handleError = function(){
	$.errorLabel.visible = true;
};
