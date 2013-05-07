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
        title: "Home",
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
        message: "Hang in there!"
    });
    $.__views.win.add($.__views.hang);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Alloy = require("alloy");
    $.win;
    var view = $.web;
    var now;
    var isUpdating = false;
    var firstTime = true;
    var init = function() {
        Ti.API.info("[pastors][init]");
        if (Ti.Network.online) if (Alloy.Globals.shouldUpdate("last_update_home_tab")) {
            firstTime && populate();
            updateFromNetwork();
        } else populate(); else populate();
    };
    var populate = function() {
        var home_html = Alloy.Globals.db.getValueByKey("home_html");
        if ("" == home_html) if (firstTime) $.hang.show(); else {
            $.tryAgain.visible = true;
            $.errorLabel.visible = true;
            $.hang.hide();
        } else {
            $.tryAgain.visible = false;
            $.errorLabel.visible = false;
            $.hang.hide();
            view.setHtml(home_html);
        }
        firstTime = false;
    };
    var updateFromNetwork = function() {
        if (!isUpdating) {
            isUpdating = true;
            var xhr = Titanium.Network.createHTTPClient();
            var url = Alloy.Globals.REST_PATH + "node/9" + ".json";
            Ti.API.info("[home][refresh] url = " + url);
            xhr.open("GET", url);
            xhr.onload = function() {
                Ti.API.info("[onload]");
                var statusCode = xhr.status;
                if (200 == statusCode) {
                    var response = xhr.responseText;
                    var data = JSON.parse(response);
                    var bodyHtml = '<html><head><title>Sample HTML</title><link rel="stylesheet" href="../../styles/styles.css" type="text/css" /></head><body><div class="webview">';
                    bodyHtml = bodyHtml + "<h1>" + data.title + "</h1>" + data.body.und[0].value;
                    bodyHtml += "</div></body></html>";
                    Alloy.Globals.db.updateValueByKey(bodyHtml, "home_html");
                    populate();
                    Alloy.Globals.db.updateValueByKey(now.toISOString(), "last_update_home_tab");
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