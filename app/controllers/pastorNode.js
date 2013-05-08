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

win.title = (pastorObject.field_profile_full_name) ? pastorObject.field_profile_full_name : '';

var bBio = Ti.UI.createButton({title:'Bio'});
bBio.addEventListener('click', function(e){
	var win = Alloy.createController('biography', {pastorObject:pastorObject, tab:tab}).getView();
	tab.open(win);
});
win.rightNavButton = bBio;

// Called every time the user opens this pastor node
var init = function(){
	Ti.API.info('[pastorNode][init]');
	
	if(firstTime){
		populate();
	}
};

var populate = function(){
	var p = pastorObject.field_profile_vision.replace(/\n|\r/g, "<br/><br/>");
	
	var spouseHtml = '';
	if(pastorObject.field_profile_spouse != '' && pastorObject.field_profile_spouse){
		spouseHtml = '<div height="17" align="center"><p>Spouse: ' + pastorObject.field_profile_spouse + '</p></div>';
	}
	
	
	var bodyHtml = '<image src= "' + pastorObject.field_photo + '"' + ' width="200" height="200" style="display: block; margin: 0 auto;"/>' + spouseHtml + '<p>' + p + '</p>';
	
	var html = '<html><head><style type="text/css">' + Alloy.Globals.HTML_STYLE + '</style></head><body>' + bodyHtml + '</body></html>';
				
	view.setHtml(html);
	firstTime = false;
};
