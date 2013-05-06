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
        top: 100,
        text: "Please check your internet connection.",
        id: "errorLabel",
        visible: "false"
    });
    $.__views.win.add($.__views.errorLabel);
    $.__views.tryAgain = Ti.UI.createView({
        borderRadius: 10,
        borderColor: "#999999",
        backgroundColor: "#CCCCCC",
        width: 145,
        height: 75,
        id: "tryAgain",
        visible: "false"
    });
    $.__views.win.add($.__views.tryAgain);
    tryAgain ? $.__views.tryAgain.addEventListener("click", tryAgain) : __defers["$.__views.tryAgain!click!tryAgain"] = true;
    $.__views.tryAgainLabel = Ti.UI.createLabel({
        font: {
            fontWeight: "bold",
            fontSize: 17
        },
        text: "Try again!",
        id: "tryAgainLabel"
    });
    $.__views.tryAgain.add($.__views.tryAgainLabel);
    $.__views.hang = Ti.UI.createActivityIndicator({
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
        id: "hang",
        message: "Don't give up!"
    });
    $.__views.win.add($.__views.hang);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Alloy = require("alloy");
    $.nav;
    $.blogWin;
    var table = $.tv;
    var tab = null;
    var now;
    var isUpdating = false;
    var firstTime = true;
    exports.setParentTab = function(pTab) {
        tab = pTab;
    };
    var init = function() {
        Ti.API.info("[blog][init]");
        if (Ti.Network.online) if (Alloy.Globals.shouldUpdate("last_update_blog_tab")) {
            if (firstTime) {
                firstTime = false;
                $.hang.show();
            }
            updateFromNetwork();
        } else populateTable(); else populateTable();
    };
    var updateFromNetwork = function() {
        if (!isUpdating) {
            isUpdating = true;
            var url = Alloy.Globals.SITE_PATH + "blog/api/json";
            var xhr = Titanium.Network.createHTTPClient({
                timeout: 2e4
            });
            xhr.open("GET", url);
            xhr.onerror = function() {
                handleError();
            };
            xhr.onload = function() {
                var statusCode = xhr.status;
                if (200 == statusCode) {
                    var response = xhr.responseText;
                    Alloy.Globals.db.updateValueByKey(response, "blog_json");
                    populateTable();
                    Alloy.Globals.db.updateValueByKey(now.toISOString(), "last_update_blog_tab");
                    isUpdating = false;
                    now = null;
                    var arr = JSON.parse(response);
                    for (var i = 0; arr.length > i; i++) {
                        var nid = arr[i].nid.toString();
                        Alloy.Globals.blogs[nid] = arr[i];
                    }
                } else handleError();
            };
            now = new Date();
            xhr.send();
        }
    };
    var populateTable = function() {
        var blogJSON = Alloy.Globals.db.getValueByKey("blog_json");
        if ("" == blogJSON) {
            $.tryAgain.visible = true;
            $.errorLabel.visible = true;
            $.hang.hide();
        } else {
            $.hang.hide();
            $.tryAgain.visible = false;
            $.errorLabel.visible = false;
            var arr = JSON.parse(blogJSON);
            table.setData(arr);
        }
    };
    var onTableClick = function(e) {
        var node = Alloy.createController("blogNode", {
            nid: e.rowData.nid,
            title: e.rowData.title
        });
        tab.open(node.window);
    };
    var handleError = function() {
        isUpdating = false;
        populateTable();
    };
    var tryAgain = function() {
        $.hang.show();
        $.tryAgain.visible = false;
        $.errorLabel.visible = false;
        isUpdating = false;
        updateFromNetwork();
    };
    __defers["$.__views.win!focus!init"] && $.__views.win.addEventListener("focus", init);
    __defers["$.__views.tv!click!onTableClick"] && $.__views.tv.addEventListener("click", onTableClick);
    __defers["$.__views.tryAgain!click!tryAgain"] && $.__views.tryAgain.addEventListener("click", tryAgain);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;