var db = function() {
    var self = {};
    var path = "new_db";
    var initialized_db = false;
    var create_db = function() {
        var _db = Ti.Database.open(path);
        _db.execute("CREATE TABLE IF NOT EXISTS UserPreferences (myKey TEXT PRIMARY KEY, myValue TEXT)");
        _db.execute("CREATE TABLE IF NOT EXISTS pastors (uid TEXT PRIMARY KEY, field_profile_full_name TEXT, field_photo TEXT)");
        _db.close();
        initialized_db = true;
    };
    self.getValueByKey = function(key) {
        Ti.API.info("[_db][getValueByKey] key: " + key);
        var returnValue = "";
        if (initialized_db) try {
            var _db = Titanium.Database.open(path);
            var resultSet = _db.execute("SELECT myValue FROM UserPreferences WHERE myKey = ?", key);
            resultSet.isValidRow() && (returnValue = resultSet.fieldByName("myValue"));
            _db.close();
        } catch (err) {
            Ti.API.warn("Attempted to get user preference that does not exist. Property: " + key);
        } else Ti.API.warn("Attempted to get user preference before database initiated. Property: " + key);
        Ti.API.info("[_db][getValueByKey] returnValue: " + returnValue);
        return returnValue;
    };
    self.updateValueByKey = function(pValue, key) {
        Titanium.API.info("[_db] updateValueByKey, property: " + key + " value: " + pValue);
        var _db = Titanium.Database.open(path);
        var resultSet = _db.execute("SELECT * FROM UserPreferences WHERE myKey = ?", key);
        var exists = false;
        while (resultSet.isValidRow()) {
            exists = true;
            resultSet.close();
        }
        if (exists) {
            Titanium.API.info("[_db] exists, UPDATE");
            _db.execute("UPDATE UserPreferences SET myValue = ? WHERE myKey = ?", pValue, key);
            Titanium.API.info("[_db] updateValueByKey, completed");
        } else {
            Titanium.API.info("[_db] does not exist, INSERT");
            _db.execute("INSERT INTO UserPreferences (myKey,myValue) VALUES (?,?)", key, pValue);
            Titanium.API.info("[_db] updateValueByKey, completed");
        }
        _db.close();
    };
    self.addPastor = function(params) {
        Titanium.API.info("[_db] addPastor, uid: " + params.uid + " field_profile_full_name: " + params.field_profile_full_name + " field_photo: " + params.field_photo);
        var _db = Titanium.Database.open(path);
        var resultSet = _db.execute("SELECT * FROM pastors WHERE uid = ?", params.uid);
        var exists = false;
        while (resultSet.isValidRow()) {
            exists = true;
            resultSet.close();
        }
        if (exists) {
            Titanium.API.info("[_db] pastor exists, UPDATE");
            _db.execute("UPDATE pastors SET field_profile_full_name = ? WHERE uid = ?", params.field_profile_full_name, params.uid);
            _db.execute("UPDATE pastors SET field_photo = ? WHERE uid = ?", params.field_photo, params.uid);
            Titanium.API.info("[_db] pastors, completed");
        } else {
            Titanium.API.info("[_db] pastor does not exist, INSERT");
            _db.execute("INSERT INTO pastors (uid, field_profile_full_name, field_photo) VALUES (?,?,?)", params.uid, params.field_profile_full_name, params.field_photo);
            Titanium.API.info("[_db] pastors, completed");
        }
        _db.close();
    };
    self.getPastors = function() {
        var _db = Ti.Database.open(path);
        var results = [];
        var resultSet = _db.execute("SELECT * FROM pastors");
        while (resultSet.isValidRow()) {
            results.push({
                uid: resultSet.fieldByName("uid"),
                field_profile_full_name: resultSet.fieldByName("field_profile_full_name"),
                field_photo: resultSet.fieldByName("field_photo")
            });
            resultSet.next();
        }
        resultSet.close();
        _db.close();
        return results;
    };
    create_db();
    return self;
};

module.exports = db;