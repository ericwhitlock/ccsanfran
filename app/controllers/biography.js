var Alloy = require('alloy');

var win = $.win;
var view = $.web;
var now;
var isUpdating = false;
var firstTime = true;


// Passed Arguments
var args = arguments[0] || {};
var tab = args.tab;
var pastorObject = args.pastorObject || {field_profile_full_name:'', field_photo:'', field_profile_vision:''};


// Called every time the user opens this pastor node
var init = function(){
	Ti.API.info('[bio][init]');
	
	if(firstTime){
		populate();
	}
};

var populate = function(){
	
	var html = '<html><head><style type="text/css">' + Alloy.Globals.HTML_STYLE + '</style></head><body>' + pastorObject.field_profile_biography + '</body></html>';
				
	view.setHtml(html);
	firstTime = false;
};
