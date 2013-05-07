function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row",
        height: "84",
        hasChild: "true"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.titleLabel = Ti.UI.createLabel({
        font: {
            fontWeight: "bold",
            fontSize: 17
        },
        color: "#000000",
        id: "titleLabel",
        left: "10",
        right: "12",
        height: "38",
        top: "2"
    });
    $.__views.row.add($.__views.titleLabel);
    $.__views.subTitleLabel = Ti.UI.createLabel({
        font: {
            fontWeight: "normal",
            fontSize: 14
        },
        color: "#666666",
        id: "subTitleLabel",
        left: "10",
        right: "12",
        height: "18",
        top: "42"
    });
    $.__views.row.add($.__views.subTitleLabel);
    $.__views.dateLabel = Ti.UI.createLabel({
        font: {
            fontWeight: "normal",
            fontSize: 14
        },
        color: "#666666",
        id: "dateLabel",
        left: "10",
        right: "12",
        height: "18",
        top: "62"
    });
    $.__views.row.add($.__views.dateLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("alloy");
    var win = $.win;
    $.web;
    exports.window = win;
    var args = arguments[0] || {};
    var nid = args.nid || "";
    var title = args.title || "";
    var body = args.body || "";
    var changed = args.changed || "";
    var author = args.author || null;
    $.row.nid = nid;
    $.row._title = title;
    $.row.body = body;
    $.row.author = author;
    $.row.changed = changed;
    $.titleLabel.text = title;
    $.subTitleLabel.text = author ? author : "Author Unknown";
    $.dateLabel.text = changed;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;