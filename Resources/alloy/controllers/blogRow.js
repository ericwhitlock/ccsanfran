function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "blogRow";
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
    $.__views.titleLabel = Ti.UI.createLabel({
        font: {
            fontWeight: "bold",
            fontSize: 17
        },
        color: "#d15941",
        id: "titleLabel",
        left: "10",
        right: "12",
        height: "44",
        top: "2"
    });
    $.__views.row.add($.__views.titleLabel);
    $.__views.subTitleName = Ti.UI.createLabel({
        font: {
            fontWeight: "bold",
            fontSize: 14
        },
        color: "#516a0f",
        id: "subTitleName",
        left: "10",
        right: "12",
        height: "18",
        top: "46"
    });
    $.__views.row.add($.__views.subTitleName);
    $.__views.dateLabel = Ti.UI.createLabel({
        font: {
            fontWeight: "normal",
            fontSize: 14
        },
        color: "#74701e",
        id: "dateLabel",
        left: "10",
        right: "12",
        height: "18",
        top: "63"
    });
    $.__views.row.add($.__views.dateLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("alloy");
    var args = arguments[0] || {};
    var nid = args.nid || "";
    var title = args.title || "";
    var body = args.body || "";
    var changed = args.changed || "";
    var author = args.field_profile_full_name || null;
    $.row.nid = nid;
    $.row._title = title;
    $.row.body = body;
    $.row.author = author;
    $.row.changed = changed;
    $.titleLabel.text = title;
    $.subTitleName.text = author ? author : "Author Unknown";
    $.dateLabel.text = changed;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;