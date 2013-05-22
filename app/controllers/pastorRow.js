var Alloy = require('alloy');

// Passed Arguments
var pastorObject = arguments[0] || {uid:'none', field_profile_full_name:'', field_profile_location:'', field_photo:''};

$.row.pastorObject = pastorObject;

$.titleLabel.text = pastorObject.field_profile_full_name;
$.subTitleLabel.text = pastorObject.field_profile_location;
$.thumb.image = pastorObject.field_photo;