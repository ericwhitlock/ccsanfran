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
        id: "web"
    });
    $.__views.win.add($.__views.web);
    $.__views.errorLabel = Ti.UI.createLabel({
        text: "Please check your internet connection.",
        id: "errorLabel",
        visible: "false"
    });
    $.__views.win.add($.__views.errorLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Alloy = require("alloy");
    $.win;
    var view = $.web;
    var init = function() {
        Ti.API.info("[home][init]");
        refresh();
    };
    var refresh = function() {
        Ti.API.info("[home][refresh]");
        $.errorLabel.visible = false;
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
                Ti.API.info("bodyHTML = " + bodyHtml);
                view.setHtml(bodyHtml);
            } else handleError();
        };
        xhr.onerror = function() {
            handleError();
        };
        xhr.send();
    };
    var handleError = function() {
        $.errorLabel.visible = true;
    };
    __defers["$.__views.win!focus!init"] && $.__views.win.addEventListener("focus", init);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;