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
        title: "Blog",
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Alloy = require("alloy");
    var win = $.win;
    var view = $.web;
    var args = arguments[0] || {};
    var tab = args.tab || "";
    var nid = args.nid || "";
    var title = args.title || "";
    var body = args.body || "";
    var author = args.author || "";
    win.title = title;
    var bComments = Ti.UI.createButton({
        title: "Comments"
    });
    bComments.addEventListener("click", function() {
        var win = Alloy.createController("comments", {
            nid: nid,
            tab: tab
        }).getView();
        tab.open(win);
    });
    win.rightNavButton = bComments;
    var firstTime = true;
    var isUpdating = false;
    var now;
    var init = function() {
        Ti.API.info("[blog][init]");
        if (Ti.Network.online) if (Alloy.Globals.shouldUpdate("last_update_blog_node_" + nid)) {
            firstTime && populate();
            updateFromNetwork();
        } else populate(); else populate();
    };
    var populate = function() {
        view.setHtml("<h1>" + title + "</h1><h4>" + author + "</h4>" + body);
        var node_data_string = Alloy.Globals.db.getValueByKey("blog_data_node_" + nid);
        if ("" != node_data_string) {
            var node_data = JSON.parse(node_data_string);
            var total_comments_string = node_data.comment;
            var total_comments = parseInt(total_comments_string);
            total_comments > 0 && (bComments.title = "Comments (" + total_comments + ")");
        }
        firstTime = false;
    };
    var updateFromNetwork = function() {
        if (!isUpdating) {
            isUpdating = true;
            var url = Alloy.Globals.REST_PATH + "node/" + nid + ".json";
            var xhr = Titanium.Network.createHTTPClient();
            xhr.open("GET", url);
            xhr.onerror = function() {
                handleError();
            };
            xhr.onload = function() {
                var statusCode = xhr.status;
                if (200 == statusCode) {
                    var response = xhr.responseText;
                    Alloy.Globals.db.updateValueByKey(response, "blog_data_node_" + nid);
                    populate();
                    Alloy.Globals.db.updateValueByKey(now.toISOString(), "last_update_blog_node_" + nid);
                    isUpdating = false;
                    now = null;
                } else handleError();
            };
            now = new Date();
            xhr.send();
        }
    };
    var handleError = function() {
        isUpdating = false;
    };
    var tryAgain = function() {
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