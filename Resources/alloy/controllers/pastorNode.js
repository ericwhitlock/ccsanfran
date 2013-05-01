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
    var win = $.win;
    var view = $.web;
    exports.window = win;
    var args = arguments[0] || {};
    var uid = args.uid || "";
    args.title || "";
    var init = function() {
        Ti.API.info("[pastorNode][init]");
        refresh();
    };
    var refresh = function() {
        var url = Alloy.Globals.REST_PATH + "user/" + uid + ".json";
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
                win.title = data.title;
                var bodyHtml = '<html><head><title>Sample HTML</title><link rel="stylesheet" href="/includes/styles.css" type="text/css" /></head><body><div class="webview">';
                bodyHtml = bodyHtml + "<h1>" + data.field_profile_full_name.und[0].safe_value + "</h1>" + data.field_profile_vision.und[0].safe_value;
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