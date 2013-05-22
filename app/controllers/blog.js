var Alloy = require('alloy');

var nav = $.nav;
var win = $.blogWin;
var table = $.tv;
var tab = null;
var now;
var isUpdating = false;
var firstTime = true;
var changed = false;
var storedRows = [];

exports.setParentTab = function(pTab){
	tab = pTab;
};

// Called every time the user clicks the Blog Tab
var init = function(){
	Ti.API.info('[blog][init]');
	
	if(Ti.Network.online){
		if(Alloy.Globals.shouldUpdate('last_update_blog_tab')){
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

var updateFromNetwork = function(){
	if(!isUpdating){
		isUpdating = true;
		var url = Alloy.Globals.SITE_PATH + 'blog/api/json';
		var xhr = Titanium.Network.createHTTPClient({timeout:Alloy.Globals.timeout});
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
				Alloy.Globals.blogsShowingIndex = 0;
				changed = true;
				populateTable();
				Alloy.Globals.db.updateValueByKey(now.toISOString(), 'last_update_blog_tab');
				isUpdating = false;
				now = null;
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
		if(firstTime){
			$.hang.show();
		}else{
			$.tryAgain.visible = true;
			$.errorLabel.visible = true;
			$.hang.hide();
		}
	}else{
		$.hang.hide();
		$.tryAgain.visible = false;
		$.errorLabel.visible = false;
		
		if(firstTime || changed){
			
			var blogCollection = JSON.parse(blogJSON);
			var i_start = Alloy.Globals.blogsShowingIndex;
			var i_end = blogCollection.length;
			if(blogCollection.length > (i_start + Alloy.Globals.MAX_BLOGS)){
				i_end = Alloy.Globals.blogsShowingIndex + Alloy.Globals.MAX_BLOGS;
			}
			var rows = [];
	    	for (var i = i_start; i < i_end; i++) {
		        var data = blogCollection[i];
		        var row = Alloy.createController('blogRow', data).getView();
		        rows.push(row);
		        Alloy.Globals.blogsShowingIndex = i;
		    }
		 	
		 	var data = storedRows.concat(rows);
		 	storedRows = data.slice(0);
		 	
		 	if(i_end < blogCollection.length){
		 		var show_more_row = Ti.UI.createTableViewRow({nid:'show_more', title:'Show more blogs!', height:84, color:Alloy.Globals.TITLE_LABEL_COLOR});
		 		data.push(show_more_row);
		 	}
		 	
		    $.tv.setData(data);
		    
		}
		
	}
	firstTime = false;
	changed = false;
};

var onTableClick = function(e){
	if(e.row.nid == 'show_more'){
		changed = true;
		Alloy.Globals.blogsShowingIndex++;
		populateTable();
	}else{
		var win = Alloy.createController('blogNode', {nid: e.row.nid, title:e.row._title, body:e.row.body, author:e.row.author, tab:tab}).getView();
		tab.open(win);
	}
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
