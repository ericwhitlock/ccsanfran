var Alloy = require('alloy');

var win = $.win;

// Passed Arguments
var args = arguments[0] || {};
var tab = args.tab || '';
var nid = args.nid || '';
var title = args.title || '';
var body = args.body || '';
var author = args.author || '';

win.title = title;

var bComments = Ti.UI.createButton({title:'Comments'});
bComments.addEventListener('click', function(e){
	var win = Alloy.createController('comments', {nid:nid, tab:tab}).getView();
	tab.open(win);
});

if(OS_ANDROID){
	bComments.top = 5;
	bComments.right = 5;
	win.add(bComments);
}else{
	win.rightNavButton = bComments;
}

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

var updateCommentsButton = function(){
	var node_data_string = Alloy.Globals.db.getValueByKey('blog_data_node_' + nid);
	if(node_data_string != ''){
		var node_data = JSON.parse(node_data_string);
		var total_comments_string = node_data.comment_count;
		var total_comments = parseInt(total_comments_string);
		
	//	if(total_comments > 0){
			bComments.title = 'Comments (' + total_comments + ')';
		}
	//}
};

var populate = function(){
	// If we decide to go with ScrollView
	//$.titleLabel.text = title;
	//$.nameLabel.text = author;
	//$.bodyLabel.text = body;
	
	// If we decide to go with WebView
	var bodyHtml = '<h1>' + title + '</h1><h4>' + author + '</h4><div>' + body + '</div>';
	var html = '<html><head><style type="text/css">' + Alloy.Globals.HTML_STYLE + '</style></head><body>' + bodyHtml + '</body></html>';
	$.web.html = html;
	
	updateCommentsButton();
	
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
		var xhr = Titanium.Network.createHTTPClient({timeout:Alloy.Globals.timeout});
		
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
				updateCommentsButton();
				Alloy.Globals.db.updateValueByKey(now.toISOString(), 'last_update_blog_node_' + nid);
				isUpdating = false;
				now = null;
			} 
			else {
				handleError();
			}
		};
		
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