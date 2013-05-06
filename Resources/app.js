var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.REST_PATH = "http://poimen.enjoycreativity.com/api/rest/";

Alloy.Globals.SITE_PATH = "http://poimen.enjoycreativity.com/";

var _database = require("db");

Alloy.Globals.db = new _database();

Alloy.Globals.blogs = {
    "-1": {
        nid: -99999,
        body: "Example",
        title: "My Title",
        changed: "03/30/2013 - 01:48"
    }
};

Alloy.Globals.shouldUpdate = function(key, minutes) {
    var shouldCheckForUpdates = false;
    var val = Alloy.Globals.db.getValueByKey(key);
    if ("" == val) shouldCheckForUpdates = true; else {
        var lastDate = new Date(val);
        var now = new Date();
        var diff = now - lastDate;
        var diffInMinutes = diff / 1e3 / 60;
        var timeRequirement = minutes ? minutes : 30;
        if (diffInMinutes > timeRequirement) {
            Ti.API.info("We should check for updates! diffInMinutes = " + diffInMinutes);
            shouldCheckForUpdates = true;
        } else Ti.API.info("No need to check for updates. diffInMinutes = " + diffInMinutes);
    }
    return shouldCheckForUpdates;
};

Alloy.Globals.alertNoConnection = function() {
    alert("No internet connection detected.");
};

Alloy.createController("index");