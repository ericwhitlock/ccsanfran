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
        title: "Pastor",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    init ? $.__views.win.addEventListener("focus", init) : __defers["$.__views.win!focus!init"] = true;
    $.__views.web = Ti.UI.createWebView({
        backgroundColor: "transparent",
        hideLoadIndicator: true,
        id: "web"
    });
    $.__views.win.add($.__views.web);
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
        message: "We're with you!"
    });
    $.__views.win.add($.__views.hang);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Alloy = require("alloy");
    var win = $.win;
    var view = $.web;
    var isUpdating = false;
    var firstTime = true;
    var args = arguments[0] || {};
    var uid = args.uid || "";
    var image = args.image || "";
    var title = args.title || "";
    win.title = title;
    var init = function() {
        Ti.API.info("[pastorNode][init]");
        if (Ti.Network.online) if (Alloy.Globals.shouldUpdate("last_update_pastornode_" + uid)) {
            firstTime && populate();
            updateFromNetwork();
        } else populate(); else populate();
    };
    var updateFromNetwork = function() {
        if (!isUpdating) {
            isUpdating = true;
            var url = Alloy.Globals.REST_PATH + "user/" + uid + ".json";
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
                    var data = JSON.parse(response);
                    var bodyHtml = '<html><head><title>Sample HTML</title><link rel="stylesheet" href="/includes/styles.css" type="text/css" /></head><body><div class="webview">';
                    bodyHtml = bodyHtml + '<image src= "' + image + '"' + ' width="200" height="200" style="display: block; margin: 0 auto;"/><br/>' + data.field_profile_vision.und[0].safe_value;
                    bodyHtml += "</div></body></html>";
                    Alloy.Globals.db.updateValueByKey(bodyHtml, "pastor_node_body_" + uid);
                    populate();
                    Alloy.Globals.db.updateValueByKey(now.toISOString(), "last_update_pastornode_" + uid);
                    now = null;
                    isUpdating = false;
                } else handleError();
            };
            var now = new Date();
            xhr.send();
        }
    };
    var populate = function() {
        var bodyHtml = Alloy.Globals.db.getValueByKey("pastor_node_body_" + uid);
        if ("" == bodyHtml) if (firstTime) {
            view.setHtml('<image src= "' + image + '"' + ' width="200" height="200" style="display: block; margin: 0 auto;"/>');
            $.hang.show();
        } else {
            $.errorLabel.visible = true;
            $.tryAgain.visible = true;
            $.hang.hide();
        } else {
            $.errorLabel.visible = false;
            $.tryAgain.visible = false;
            $.hang.hide();
            view.setHtml(bodyHtml);
        }
        firstTime = false;
    };
    var handleError = function() {
        isUpdating = false;
        populate();
    };
    var tryAgain = function() {
        $.hang.show();
        $.tryAgain.visible = false;
        $.errorLabel.visible = false;
        isUpdating = false;
        updateFromNetwork();
    };
    __defers["$.__views.win!focus!init"] && $.__views.win.addEventListener("focus", init);
    __defers["$.__views.tryAgain!click!tryAgain"] && $.__views.tryAgain.addEventListener("click", tryAgain);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;