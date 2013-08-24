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

var bBio = Ti.UI.createButton({title:Alloy.isTablet ? 'Biography' : 'Bio'});
bBio.addEventListener('click', function(e){
	onBioClick();
});
if(OS_ANDROID){
	bBio.top = 5;
	bBio.right = 5;
	win.add(bBio);
}else{
	win.rightNavButton = bBio;
}

var onBioClick = function(){
	var win = Alloy.createController('biography', {pastorObject:pastorObject, tab:tab}).getView();
	tab.open(win);
};

// Called every time the user opens this pastor node
var init = function(){
	Ti.API.info('[pastorNode][init]');
	
	if(firstTime){
		populate();
	}
};

var populate = function(){
	
	// If we decide to go with using a scrollView
	//$.img.image = pastorObject.field_photo;
	//$.vision.text = pastorObject.field_profile_vision;
	
	// If we decide to go with a webview
	var spouseHtml = '';
	if(pastorObject.field_profile_spouse != '' && pastorObject.field_profile_spouse){
		spouseHtml = '<div height="17" align="center"><p>Spouse: ' + pastorObject.field_profile_spouse + '</p></div>';
	}
	var bodyHTML;
	if(OS_ANDROID){
		bodyHtml = '<div><image src= "' + pastorObject.field_photo + '"' + ' width="200" height="200" style="display: block; margin: 0 0;"/></div>' + spouseHtml + pastorObject.field_profile_vision;
	}else{
		bodyHtml = '<div><image src= "' + pastorObject.field_photo + '"' + ' width="200" height="200" style="display: block; margin: 0 auto;"/></div>' + spouseHtml + pastorObject.field_profile_vision;
	}
	var html = '<html><head><style type="text/css">' + Alloy.Globals.HTML_STYLE + '</style></head><body>' + bodyHtml + '</body></html>';
	$.web.html = html;
	
	firstTime = false;
	
};
