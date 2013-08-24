function Controller() {
    function populateTable() {
        var pastorCollection = Alloy.Globals.db.getPastors();
        if (pastorCollection.length > 0) {
            $.hang.hide();
            $.tryAgain.visible = false;
            $.errorLabel.visible = false;
            if (firstTime || changed) {
                var rows = [];
                for (var i = 0; pastorCollection.length > i; i++) {
                    var data = pastorCollection[i];
                    var row = Alloy.createController("pastorRow", data).getView();
                    rows.push(row);
                }
                $.tv.setData(rows);
            }
        } else if (firstTime) $.hang.show(); else {
            $.tryAgain.visible = true;
            $.errorLabel.visible = true;
            $.hang.hide();
        }
        firstTime = false;
        changed = false;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pastors";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#FBFFBD",
        barColor: "#e2b958",
        title: "Pastors",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    init ? $.__views.win.addEventListener("focus", init) : __defers["$.__views.win!focus!init"] = true;
    $.__views.tv = Ti.UI.createTableView({
        backgroundColor: "#FBFFBD",
        separatorColor: "#e0cc5b",
        id: "tv",
        width: Ti.UI.FILL
    });
    $.__views.win.add($.__views.tv);
    onTableClick ? $.__views.tv.addEventListener("click", onTableClick) : __defers["$.__views.tv!click!onTableClick"] = true;
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
        message: "Stay the course!"
    });
    $.__views.win.add($.__views.hang);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Alloy = require("alloy");
    $.win;
    $.tv;
    var tab = null;
    var now;
    var isUpdating = false;
    var firstTime = true;
    var changed = false;
    exports.setParentTab = function(pTab) {
        tab = pTab;
    };
    var init = function() {
        Ti.API.info("[pastors][init]");
        if (Ti.Network.online) if (Alloy.Globals.shouldUpdate("last_update_pastors_tab")) {
            firstTime && populateTable();
            updateFromNetwork();
        } else populateTable(); else populateTable();
    };
    var updateFromNetwork = function() {
        if (!isUpdating) {
            isUpdating = true;
            var url = Alloy.Globals.SITE_PATH + "pastors/api/json";
            Ti.API.info("[pastors][updateFromNetwork] url = " + url);
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
                    var result = JSON.parse(response);
                    for (var key in result) {
                        var data = result[key];
                        Alloy.Globals.db.addPastor(data);
                    }
                    changed = true;
                    populateTable();
                    Alloy.Globals.db.updateValueByKey(now.toISOString(), "last_update_pastors_tab");
                    now = null;
                    isUpdating = false;
                } else handleError();
            };
            now = new Date();
            xhr.send();
        }
    };
    var onTableClick = function(e) {
        var win = Alloy.createController("pastorNode", {
            pastorObject: e.row.pastorObject,
            tab: tab
        }).getView();
        tab.open(win, {
            animated: true
        });
    };
    var handleError = function() {
        isUpdating = false;
        populateTable();
    };
    var tryAgain = function() {
        $.hang.show();
        $.tryAgain.visible = false;
        $.errorLabel.visible = false;
        isUpdating = false;
        updateFromNetwork();
    };
    __defers["$.__views.win!focus!init"] && $.__views.win.addEventListener("focus", init);
    __defers["$.__views.tv!click!onTableClick"] && $.__views.tv.addEventListener("click", onTableClick);
    __defers["$.__views.tryAgain!click!tryAgain"] && $.__views.tryAgain.addEventListener("click", tryAgain);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;