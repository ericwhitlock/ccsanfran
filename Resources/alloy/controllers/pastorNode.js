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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Alloy = require("alloy");
    var win = $.win;
    var view = $.web;
    var firstTime = true;
    var args = arguments[0] || {};
    var tab = args.tab;
    var pastorObject = args.pastorObject || {
        field_profile_full_name: "",
        field_photo: "",
        field_profile_vision: ""
    };
    win.title = pastorObject.field_profile_full_name ? pastorObject.field_profile_full_name : "";
    var bBio = Ti.UI.createButton({
        title: "Bio"
    });
    bBio.addEventListener("click", function() {
        var win = Alloy.createController("biography", {
            pastorObject: pastorObject,
            tab: tab
        }).getView();
        tab.open(win);
    });
    win.rightNavButton = bBio;
    var init = function() {
        Ti.API.info("[pastorNode][init]");
        firstTime && populate();
    };
    var populate = function() {
        var spouseHtml = "";
        "" != pastorObject.field_profile_spouse && pastorObject.field_profile_spouse && (spouseHtml = '<div height="17" align="center"><p>Spouse: ' + pastorObject.field_profile_spouse + "</p></div>");
        var bodyHtml = '<image src= "' + pastorObject.field_photo + '"' + ' width="200" height="200" style="display: block; margin: 0 auto;"/>' + spouseHtml + "<p>" + pastorObject.field_profile_vision + "</p>";
        var html = '<html><head><style type="text/css">' + Alloy.Globals.HTML_STYLE + "</style></head><body>" + bodyHtml + "</body></html>";
        view.setHtml(html);
        firstTime = false;
    };
    __defers["$.__views.win!focus!init"] && $.__views.win.addEventListener("focus", init);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;