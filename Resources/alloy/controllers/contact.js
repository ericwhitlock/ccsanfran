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
        message: "Almost there!"
    });
    $.__views.win.add($.__views.hang);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Alloy = require("alloy");
    $.win;
    var view = $.web;
    var now;
    var firstTime = true;
    var init = function() {
        Ti.API.info("[pastors][init]");
        if (Ti.Network.online) if (Alloy.Globals.shouldUpdate("last_update_contact_tab")) {
            firstTime && populate();
            updateFromNetwork();
        } else populate(); else populate();
    };
    var populate = function() {
        var contact_data_string = Alloy.Globals.db.getValueByKey("contact_json");
        if ("" == contact_data_string) if (firstTime) $.hang.show(); else {
            $.tryAgain.visible = true;
            $.errorLabel.visible = true;
            $.hang.hide();
        } else {
            $.tryAgain.visible = false;
            $.errorLabel.visible = false;
            $.hang.hide();
            var contact_data = JSON.parse(contact_data_string);
            var bodyHtml = '<html><head><title>Sample HTML</title><link rel="stylesheet" href="styles.css" type="text/css" /></head><body><div class="webview">';
            bodyHtml = bodyHtml + "<h1>" + contact_data.title + "</h1>" + contact_data.body.und[0].value;
            bodyHtml += "</div></body></html>";
            view.setHtml(bodyHtml);
        }
        firstTime = false;
    };
    var updateFromNetwork = function() {
        var url = Alloy.Globals.REST_PATH + "node/5" + ".json";
        var xhr = Titanium.Network.createHTTPClient();
        xhr.open("GET", url);
        xhr.onerror = function() {
            handleError();
        };
        xhr.onload = function() {
            var statusCode = xhr.status;
            if (200 == statusCode) {
                var response = xhr.responseText;
                Alloy.Globals.db.updateValueByKey(response, "contact_json");
                Alloy.Globals.db.updateValueByKey(now.toISOString(), "last_update_contact_tab");
                populate();
            } else handleError();
        };
        now = new Date();
        xhr.send();
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