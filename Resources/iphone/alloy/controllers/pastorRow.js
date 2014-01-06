function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pastorRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "row",
        height: "88",
        hasChild: "true"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.thumb = Ti.UI.createImageView({
        id: "thumb",
        left: "0",
        height: "88",
        width: "88"
    });
    $.__views.row.add($.__views.thumb);
    $.__views.titleLabel = Ti.UI.createLabel({
        font: {
            fontWeight: "bold",
            fontSize: 17
        },
        color: "#b82b21",
        id: "titleLabel",
        left: "95",
        top: "15",
        height: "24"
    });
    $.__views.row.add($.__views.titleLabel);
    $.__views.subTitleLabel = Ti.UI.createLabel({
        font: {
            fontWeight: "normal",
            fontSize: 14
        },
        color: "#516a0f",
        id: "subTitleLabel",
        left: "95",
        top: "42",
        height: "18"
    });
    $.__views.row.add($.__views.subTitleLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("alloy");
    var pastorObject = arguments[0] || {
        uid: "none",
        field_profile_full_name: "",
        field_profile_location: "",
        field_photo: ""
    };
    $.row.pastorObject = pastorObject;
    $.titleLabel.text = pastorObject.field_profile_full_name;
    $.subTitleLabel.text = pastorObject.field_profile_location;
    $.thumb.image = pastorObject.field_photo;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;