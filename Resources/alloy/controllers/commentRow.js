function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        id: "row",
        height: Ti.UI.SIZE,
        hasChild: "false"
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
        height: "40",
        top: "2"
    });
    $.__views.row.add($.__views.titleLabel);
    $.__views.dateLabel = Ti.UI.createLabel({
        font: {
            fontWeight: "normal",
            fontSize: 14
        },
        color: "#74701e",
        id: "dateLabel",
        right: "12",
        height: "18",
        top: "2"
    });
    $.__views.row.add($.__views.dateLabel);
    $.__views.commentLabel = Ti.UI.createLabel({
        font: {
            fontWeight: "normal",
            fontSize: 14
        },
        color: "#74701e",
        id: "commentLabel",
        left: "10",
        right: "12",
        height: Ti.UI.SIZE,
        top: "42"
    });
    $.__views.row.add($.__views.commentLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Alloy = require("alloy");
    var args = arguments[0] || {};
    var author = args.name || "(No Name)";
    var changed = new Date(1e3 * parseInt(args.changed)) || null;
    var comment = args.comment_body.und[0].value || "";
    $.titleLabel.text = author;
    changed && ($.dateLabel.text = Alloy.Globals.getReadableDateTime(changed));
    $.commentLabel.text = comment + "\n\n";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;