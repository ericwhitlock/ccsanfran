var Alloy = require('alloy');

// Passed Arguments
var args = arguments[0] || {};
var author = args.name || '(No Name)';
var changed = new Date(1000 * parseInt(args.changed)) || null;
var comment = args.comment_body.und[0].value || '';


$.titleLabel.text = author; 
if(changed){
	$.dateLabel.text = Alloy.Globals.getReadableDateTime(changed);
}
$.commentLabel.text = comment + '\n\n';