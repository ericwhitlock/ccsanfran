function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "home";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#f6e18e",
        barColor: "#e2b958",
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
    $.web;
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
        var home_title_text = Alloy.Globals.db.getValueByKey("home_title_text");
        var home_body_text = Alloy.Globals.db.getValueByKey("home_body_text");
        if ("" == home_title_text) if (firstTime) $.hang.show(); else {
            $.tryAgain.visible = true;
            $.errorLabel.visible = true;
            $.hang.hide();
        } else {
            $.tryAgain.visible = false;
            $.errorLabel.visible = false;
            $.hang.hide();
            var bodyHtml = "<h1>" + home_title_text + "</h1><div>" + home_body_text + "</div>";
            var html = '<html><head><style type="text/css">' + Alloy.Globals.HTML_STYLE + "</style></head><body>" + bodyHtml + "</body></html>";
            $.web.html = html;
        }
        firstTime = false;
    };
    var updateFromNetwork = function() {
        if (!isUpdating) {
            isUpdating = true;
            var xhr = Titanium.Network.createHTTPClient({
                timeout: Alloy.Globals.timeout
            });
            var url = Alloy.Globals.REST_PATH + "node/9" + ".json";
            Ti.API.info("[home][refresh] url = " + url);
            xhr.open("GET", url);
            xhr.onload = function() {
                Ti.API.info("[onload]");
                var statusCode = xhr.status;
                if (200 == statusCode) {
                    var response = xhr.responseText;
                    var data = JSON.parse(response);
                    Alloy.Globals.db.updateValueByKey(data.title, "home_title_text");
                    Alloy.Globals.db.updateValueByKey(data.body.und[0].safe_value, "home_body_text");
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