function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pastorNode";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        navBarHidden: true,
        backgroundColor: "#FFF7CD",
        title: "Pastor",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    init ? $.__views.win.addEventListener("focus", init) : __defers["$.__views.win!focus!init"] = true;
    $.__views.__alloyId7 = Ti.UI.createScrollView({
        top: "0",
        bottom: "0",
        right: "0",
        left: "0",
        contentHeight: Ti.UI.SIZE,
        id: "__alloyId7"
    });
    $.__views.win.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "0",
        id: "__alloyId8"
    });
    $.__views.__alloyId7.add($.__views.__alloyId8);
    $.__views.web = Ti.UI.createWebView({
        backgroundColor: "transparent",
        hideLoadIndicator: true,
        id: "web",
        touchEnabled: "false"
    });
    $.__views.__alloyId8.add($.__views.web);
    $.__views.__alloyId9 = Ti.UI.createButton({
        title: "Bio",
        width: "65",
        height: "37",
        top: "5",
        right: "10",
        id: "__alloyId9"
    });
    $.__views.__alloyId8.add($.__views.__alloyId9);
    onBioClick ? $.__views.__alloyId9.addEventListener("click", onBioClick) : __defers["$.__views.__alloyId9!click!onBioClick"] = true;
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
    $.web;
    var firstTime = true;
    var args = arguments[0] || {};
    var tab = args.tab;
    var pastorObject = args.pastorObject || {
        field_profile_full_name: "",
        field_photo: "",
        field_profile_vision: ""
    };
    win.title = pastorObject.field_profile_full_name ? pastorObject.field_profile_full_name : "";
    var onBioClick = function() {
        var win = Alloy.createController("biography", {
            pastorObject: pastorObject,
            tab: tab
        }).getView();
        tab.open(win);
    };
    var init = function() {
        Ti.API.info("[pastorNode][init]");
        firstTime && populate();
    };
    var populate = function() {
        var spouseHtml = "";
        "" != pastorObject.field_profile_spouse && pastorObject.field_profile_spouse && (spouseHtml = '<div height="17" align="left"><p>Spouse: ' + pastorObject.field_profile_spouse + "</p></div>");
        bodyHtml = '<div><image src= "' + pastorObject.field_photo + '"' + ' width="200" height="200" style="display: block; margin: 0 0;"/></div>' + spouseHtml + pastorObject.field_profile_vision;
        var html = '<html><head><style type="text/css">' + Alloy.Globals.HTML_STYLE + "</style>" + Alloy.Globals.HTML_META + "</head><body>" + bodyHtml + "</body></html>";
        $.web.html = html;
        firstTime = false;
    };
    __defers["$.__views.win!focus!init"] && $.__views.win.addEventListener("focus", init);
    __defers["$.__views.__alloyId9!click!onBioClick"] && $.__views.__alloyId9.addEventListener("click", onBioClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;