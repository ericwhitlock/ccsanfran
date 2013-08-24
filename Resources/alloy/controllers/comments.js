function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "comments";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#f6e18e",
        barColor: "#e2b958",
        title: "Comments",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    init ? $.__views.win.addEventListener("focus", init) : __defers["$.__views.win!focus!init"] = true;
    $.__views.tv = Ti.UI.createTableView({
        backgroundColor: "#f6e18e",
        separatorColor: "#e0cc5b",
        id: "tv"
    });
    $.__views.win.add($.__views.tv);
    $.__views.errorLabel = Ti.UI.createLabel({
        top: 100,
        text: "Please check your internet connection.",
        id: "errorLabel",
        visible: "false"
    });
    $.__views.win.add($.__views.errorLabel);
    $.__views.tryAgain = Ti.UI.createView({
        borderRadius: 10,
        borderColor: "#a99b43",
        backgroundColor: "#e2ca72",
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
        color: "#f09b1e",
        text: "Try again!",
        id: "tryAgainLabel"
    });
    $.__views.tryAgain.add($.__views.tryAgainLabel);
    $.__views.hang = Ti.UI.createActivityIndicator({
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
        id: "hang",
        message: "Hang in there!"
    });
    $.__views.win.add($.__views.hang);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Alloy = require("alloy");
    $.win;
    var view = $.tv;
    var now;
    var isUpdating = false;
    var firstTime = true;
    var args = arguments[0] || {};
    args.tab || "";
    var nid = args.nid || "";
    var init = function() {
        Ti.API.info("[comments][init]");
        Ti.Network.online ? updateFromNetwork() : populate();
    };
    var populateTable = function(str) {
        var obj = JSON.parse(str);
        var rows = [];
        var arr = [];
        for (comment in obj) {
            var commentObject = obj[comment];
            1 == parseInt(commentObject.status) && arr.push(obj[comment]);
        }
        arr.sort(function(a, b) {
            var x = new Date(1e3 * a.changed);
            var y = new Date(1e3 * b.changed);
            return x > y ? -1 : y > x ? 1 : 0;
        });
        for (var i = 0; arr.length > i; i++) {
            var row = Alloy.createController("commentRow", arr[i]).getView();
            rows.push(row);
        }
        view.setData(rows);
    };
    var populate = function() {
        var comments_json = Alloy.Globals.db.getValueByKey("node_" + nid + "_comments");
        if ("" == comments_json) if (firstTime) $.hang.show(); else {
            $.tryAgain.visible = true;
            $.errorLabel.visible = true;
            $.hang.hide();
        } else {
            $.tryAgain.visible = false;
            $.errorLabel.visible = false;
            $.hang.hide();
            populateTable(comments_json);
        }
        firstTime = false;
    };
    var updateFromNetwork = function() {
        if (!isUpdating) {
            isUpdating = true;
            var xhr = Titanium.Network.createHTTPClient();
            var url = Alloy.Globals.REST_PATH + "node/" + nid + "/comments.json";
            Ti.API.info("[comments][updateFromNetwork] url = " + url);
            xhr.open("GET", url);
            xhr.onload = function() {
                Ti.API.info("[onload]");
                var statusCode = xhr.status;
                if (200 == statusCode) {
                    var response = xhr.responseText;
                    Ti.API.info("comments: " + response);
                    Alloy.Globals.db.updateValueByKey(response, "node_" + nid + "_comments");
                    populate();
                    Alloy.Globals.db.updateValueByKey(now.toISOString(), "last_update_comments_node_" + nid);
                    now = null;
                    isUpdating = false;
                } else handleError();
            };
            xhr.onerror = function() {
                handleError();
            };
            now = new Date();
            xhr.send();
        }
    };
    var handleError = function() {
        isUpdating = false;
        populate();
    };
    var tryAgain = function() {
        $.tryAgain.visible = false;
        $.errorLabel.visible = false;
        $.hang.show();
        isUpdating = false;
        updateFromNetwork();
    };
    __defers["$.__views.win!focus!init"] && $.__views.win.addEventListener("focus", init);
    __defers["$.__views.tryAgain!click!tryAgain"] && $.__views.tryAgain.addEventListener("click", tryAgain);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;