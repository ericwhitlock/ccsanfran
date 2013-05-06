var Alloy = require('alloy');

var win = $.win;
var view = $.web;

// Public Vars
exports.window = win;

// Passed Arguments
var args = arguments[0] || {};
var uid = args.uid || '';
var field_profile_full_name = args.field_profile_full_name || '';
var field_photo = args.field_photo || '';
var field_photo_local = args.field_photo_local || '';

$.row.uid = uid;
$.row.field_profile_full_name = field_profile_full_name;
$.row.field_photo = field_photo;

$.titleLabel.text = field_profile_full_name;

$.thumb.image = (field_photo_local != '') ? field_photo_local : field_photo;