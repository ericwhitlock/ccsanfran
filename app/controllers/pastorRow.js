var Alloy = require('alloy');

var win = $.win;
var view = $.web;

// Public Vars
exports.window = win;

// Passed Arguments
var args = arguments[0] || {};
var uid = args.uid || '';
var field_profile_full_name = args.field_profile_full_name || 'Name Unknown';
var field_photo = args.field_photo || '';
var field_profile_location = args.field_profile_location || 'Location Unknown';

$.row.uid = uid;
$.row.field_profile_full_name = field_profile_full_name;
$.row.field_photo = field_photo;

$.titleLabel.text = field_profile_full_name;
$.subTitleLabel.text = field_profile_location;
$.thumb.image = field_photo;