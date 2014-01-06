function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "blogNode";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        navBarHidden: false,
        backgroundColor: "#FFF7CD",
        barColor: "#e2b958",
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Alloy = require("alloy");
    var win = $.win;
    var args = arguments[0] || {};
    var tab = args.tab || "";
    var nid = args.nid || "";
    var title = args.title || "";
    var body = args.body || "";
    var author = args.author || "";
    win.title = title;
    var bComments;
    bComments = Ti.UI.createButton({
        title: "Comments"
    });
    bComments.addEventListener("click", function() {
        onCommentsClick();
    });
    win.rightNavButton = bComments;
    var firstTime = true;
    var isUpdating = false;
    var now;
    var onCommentsClick = function() {
        var win = Alloy.createController("comments", {
            nid: nid,
            tab: tab
        }).getView();
        tab.open(win);
    };
    var init = function() {
        Ti.API.info("[blog][init]");
        if (Ti.Network.online) if (Alloy.Globals.shouldUpdate("last_update_blog_node_" + nid)) {
            firstTime && populate();
            updateFromNetwork();
        } else populate(); else populate();
    };
    var updateCommentsButton = function() {
        var node_data_string = Alloy.Globals.db.getValueByKey("blog_data_node_" + nid);
        if ("" != node_data_string) {
            var node_data = JSON.parse(node_data_string);
            var total_comments_string = node_data.comment_count;
            var total_comments = parseInt(total_comments_string);
            bComments.title = "Comments (" + total_comments + ")";
        }
    };
    var populate = function() {
        var node_data_string = Alloy.Globals.db.getValueByKey("blog_data_node_" + nid);
        if ("" != node_data_string) {
            var node_data = JSON.parse(node_data_string);
            var stored_body_string = node_data.body.und[0].safe_value;
            body = stored_body_string;
        }
        var bodyHtml = "<h1>" + title + "</h1><h4>" + author + "</h4>" + body;
        var html = '<html><head><style type="text/css">' + Alloy.Globals.HTML_STYLE + "</style>" + Alloy.Globals.HTML_META + "</head><body>" + bodyHtml + "</body></html>";
        $.web.html = html;
        updateCommentsButton();
        firstTime = false;
    };
    var updateFromNetwork = function() {
        if (!isUpdating) {
            isUpdating = true;
            var url = Alloy.Globals.REST_PATH + "node/" + nid + ".json";
            var xhr = Titanium.Network.createHTTPClient({
                timeout: Alloy.Globals.timeout
            });
            xhr.open("GET", url);
            xhr.onerror = function() {
                handleError();
            };
            xhr.onload = function() {
                var statusCode = xhr.status;
                if (200 == statusCode) {
                    var response = xhr.responseText;
                    var data = JSON.parse(response);
                    body = data.body.und[0].safe_value;
                    populate();
                    Alloy.Globals.db.updateValueByKey(response, "blog_data_node_" + nid);
                    updateCommentsButton();
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
    __defers["$.__views.win!focus!init"] && $.__views.win.addEventListener("focus", init);
    __defers["$.__views.bComments!click!onCommentsClick"] && $.__views.bComments.addEventListener("click", onCommentsClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;