var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.REST_PATH = "http://poimen.enjoycreativity.com/api/rest/";

Alloy.Globals.SITE_PATH = "http://poimen.enjoycreativity.com/";

Alloy.Globals.MAX_BLOGS = 5;

Alloy.Globals.blogsShowingIndex = 0;

var _database = require("db");

Alloy.Globals.db = new _database();

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