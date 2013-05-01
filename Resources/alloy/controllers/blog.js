function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#DDDDDD",
        barColor: "#999999",
        id: "win",
        title: "Blog"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    init ? $.__views.win.addEventListener("focus", init) : __defers["$.__views.win!focus!init"] = true;
    $.__views.tv = Ti.UI.createTableView({
        backgroundColor: "#DDDDDD",
        separatorColor: "CCCCCC",
        id: "tv"
    });
    $.__views.win.add($.__views.tv);
    onTableClick ? $.__views.tv.addEventListener("click", onTableClick) : __defers["$.__views.tv!click!onTableClick"] = true;
    $.__views.errorLabel = Ti.UI.createLabel({
        text: "Please check your internet connection.",
        id: "errorLabel",
        visible: "false"
    });
    $.__views.win.add($.__views.errorLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Alloy = require("alloy");
    $.nav;
    $.blogWin;
    var table = $.tv;
    var tab = null;
    exports.setParentTab = function(pTab) {
        tab = pTab;
    };
    var init = function() {
        Ti.API.info("[blog][init]");
        refresh();
    };
    var refresh = function() {
        Ti.API.info("[blog][refresh]");
        var url = Alloy.Globals.SITE_PATH + "blog/api/json";
        var xhr = Titanium.Network.createHTTPClient();
        xhr.open("GET", url);
        xhr.onerror = function() {
            handleError();
        };
        xhr.onload = function() {
            var statusCode = xhr.status;
            if (200 == statusCode) {
                $.errorLabel.visible = false;
                var response = xhr.responseText;
                var result = JSON.parse(response);
                var results = new Array();
                for (var key in result) {
                    var data = result[key];
                    results[key] = {
                        title: data.title,
                        hasChild: true,
                        nid: data.nid
                    };
                }
                table.setData(results);
            } else handleError();
        };
        xhr.send();
    };
    var onTableClick = function(e) {
        var node = Alloy.createController("blogNode", {
            nid: e.rowData.nid,
            title: e.rowData.title
        });
        tab.open(node.window);
    };
    var handleError = function() {
        $.errorLabel.visible = true;
    };
    __defers["$.__views.win!focus!init"] && $.__views.win.addEventListener("focus", init);
    __defers["$.__views.tv!click!onTableClick"] && $.__views.tv.addEventListener("click", onTableClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;