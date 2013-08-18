var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.REST_PATH = "http://poimenministries.com/api/rest/";

Alloy.Globals.SITE_PATH = "http://poimenministries.com/";

Alloy.Globals.MAX_BLOGS = 20;

Alloy.Globals.blogsShowingIndex = 0;

Alloy.Globals.timeout = 8e4;

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

Alloy.Globals.getReadableDateTime = function(d) {
    var obj = {
        h: d.getHours(),
        m: d.getMinutes(),
        s: d.getSeconds()
    };
    var str = "";
    str += d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear() + "   ";
    var m = " AM";
    var hour = obj.h;
    if (hour >= 12) {
        hour -= 12;
        m = " PM";
        0 == hour && (hour = 12);
    }
    hour > 0 && (str += hour + ":");
    str += obj.m > 0 ? obj.m > 9 ? obj.m : "0" + obj.m : "00";
    str += m;
    return str;
};

Alloy.Globals.TITLE_LABEL_COLOR = "#d15941";

Alloy.Globals.HTML_STYLE = "h1{color:#d15941;font-size:22;font-family:Helvetica;} h4{color:#516a0f;font-size:18;font-family:Helvetica;} p{color:#74701e;font-size:15;font-family:Helvetica;} ";

Alloy.createController("index");