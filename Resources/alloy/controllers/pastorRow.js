function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row",
        height: "50",
        hasChild: "true"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.thumb = Ti.UI.createImageView({
        id: "thumb",
        left: "0",
        height: "50",
        width: "50"
    });
    $.__views.row.add($.__views.thumb);
    $.__views.titleLabel = Ti.UI.createLabel({
        font: {
            fontWeight: "bold",
            fontSize: 17
        },
        color: "#000000",
        id: "titleLabel",
        left: "63",
        top: "5"
    });
    $.__views.row.add($.__views.titleLabel);
    $.__views.subTitleLabel = Ti.UI.createLabel({
        font: {
            fontWeight: "normal",
            fontSize: 14
        },
        color: "#666666",
        id: "subTitleLabel",
        left: "63",
        top: "28"
    });
    $.__views.row.add($.__views.subTitleLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("alloy");
    var win = $.win;
    $.web;
    exports.window = win;
    var args = arguments[0] || {};
    var uid = args.uid || "";
    var field_profile_full_name = args.field_profile_full_name || "Name Unknown";
    var field_photo = args.field_photo || "";
    var field_profile_location = args.field_profile_location || "Location Unknown";
    $.row.uid = uid;
    $.row.field_profile_full_name = field_profile_full_name;
    $.row.field_photo = field_photo;
    $.titleLabel.text = field_profile_full_name;
    $.subTitleLabel.text = field_profile_location;
    $.thumb.image = field_photo;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;