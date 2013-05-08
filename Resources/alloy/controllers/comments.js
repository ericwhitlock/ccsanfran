function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
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
    require("alloy");
    $.win;
    $.web;
    var isUpdating = false;
    var args = arguments[0] || {};
    args.tab || "";
    args.nid || "";
    var init = function() {
        Ti.API.info("[comments][init]");
        Ti.Network.online ? updateFromNetwork() : populate();
    };
    var populate = function() {};
    var updateFromNetwork = function() {};
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