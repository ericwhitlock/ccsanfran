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
        title: "Contact"
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
        Ti.API.info("[contact][init]");
        refresh();
    };
    var refresh = function() {
        var url = Alloy.Globals.REST_PATH + "node/5" + ".json";
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
                var data = JSON.parse(response);
                var bodyHtml = '<html><head><title>Sample HTML</title><link rel="stylesheet" href="styles.css" type="text/css" /></head><body><div class="webview">';
                bodyHtml = bodyHtml + "<h1>" + data.title + "</h1>" + data.body.und[0].value;
                bodyHtml += "</div></body></html>";
                view.setHtml(bodyHtml);
            } else handleError();
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