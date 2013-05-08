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
        title: "Bio",
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Alloy = require("alloy");
    $.win;
    var view = $.web;
    var firstTime = true;
    var args = arguments[0] || {};
    args.tab;
    var pastorObject = args.pastorObject || {
        field_profile_full_name: "",
        field_photo: "",
        field_profile_vision: ""
    };
    var init = function() {
        Ti.API.info("[bio][init]");
        firstTime && populate();
    };
    var populate = function() {
        var p = pastorObject.field_profile_biography.replace(/\n|\r/g, "<br/><br/>");
        var bodyHtml = "<p>" + p + "</p>";
        var html = '<html><head><style type="text/css">' + Alloy.Globals.HTML_STYLE + "</style></head><body>" + bodyHtml + "</body></html>";
        view.setHtml(html);
        firstTime = false;
    };
    __defers["$.__views.win!focus!init"] && $.__views.win.addEventListener("focus", init);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;