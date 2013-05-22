var Alloy = require('alloy');

// Passed Arguments
var args = arguments[0] || {};
var nid = args.nid || '';
var title = args.title || '';
var body = args.body || '';
var changed = args.changed || '';
var author = args.field_profile_full_name || null;

$.row.nid = nid;
$.row._title = title;
$.row.body = body;
$.row.author = author;
$.row.changed = changed;

$.titleLabel.text = title; 
$.subTitleName.text = (author) ? author : 'Author Unknown';
$.dateLabel.text = changed;