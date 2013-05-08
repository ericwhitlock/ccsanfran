var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.REST_PATH = "http://poimen.enjoycreativity.com/api/rest/";

Alloy.Globals.SITE_PATH = "http://poimen.enjoycreativity.com/";

Alloy.Globals.MAX_BLOGS = 20;

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

Alloy.Globals.TITLE_LABEL_COLOR = "#d15941";

Alloy.Globals.HTML_STYLE = "h1{color:#d15941;font-size:22;font-family:Helvetica;} h4{color:#516a0f;font-size:18;font-family:Helvetica;} p{color:#74701e;font-size:15;font-family:Helvetica;} ";

Alloy.createController("index");