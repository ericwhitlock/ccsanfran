function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId5 = [];
    $.__views.home = Alloy.createController("home", {
        id: "home"
    });
    $.__views.__alloyId6 = Ti.UI.createTab({
        window: $.__views.home.getViewEx({
            recurse: true
        }),
        title: "Home",
        icon: "/icons/53-house.png",
        id: "__alloyId6"
    });
    __alloyId5.push($.__views.__alloyId6);
    $.__views.blog = Alloy.createController("blog", {
        id: "blog"
    });
    $.__views.blogTab = Ti.UI.createTab({
        window: $.__views.blog.getViewEx({
            recurse: true
        }),
        id: "blogTab",
        title: "Blog",
        icon: "/icons/96-book.png"
    });
    __alloyId5.push($.__views.blogTab);
    $.__views.pastors = Alloy.createController("pastors", {
        id: "pastors"
    });
    $.__views.pastorsTab = Ti.UI.createTab({
        window: $.__views.pastors.getViewEx({
            recurse: true
        }),
        id: "pastorsTab",
        title: "Pastors",
        icon: "/icons/112-group.png"
    });
    __alloyId5.push($.__views.pastorsTab);
    $.__views.contact = Alloy.createController("contact", {
        id: "contact"
    });
    $.__views.__alloyId7 = Ti.UI.createTab({
        window: $.__views.contact.getViewEx({
            recurse: true
        }),
        title: "Contact",
        icon: "/icons/96-book.png",
        id: "__alloyId7"
    });
    __alloyId5.push($.__views.__alloyId7);
    $.__views.tabs = Ti.UI.createTabGroup({
        tabs: __alloyId5,
        id: "tabs",
        navBarHidden: "true"
    });
    $.__views.tabs && $.addTopLevelView($.__views.tabs);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tabs.open();
    $.blog.setParentTab($.blogTab);
    $.pastors.setParentTab($.pastorsTab);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;