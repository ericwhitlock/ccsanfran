	
//=========================
// 	Utilities
// 	Database
//
//=========================
var db = function(){
	var self = {};
	var path = 'new_db';
	var initialized_db = false;
	
	var create_db = function(){
		var _db = Ti.Database.open(path);
		
		// This table is a key/value table for storing various values such as visual preference (display assets as icons or list), user data (token), etc.
		_db.execute('CREATE TABLE IF NOT EXISTS UserPreferences (myKey TEXT PRIMARY KEY, myValue TEXT)');
		
		
		_db.execute('CREATE TABLE IF NOT EXISTS pastors (uid TEXT PRIMARY KEY, field_profile_full_name TEXT, field_photo TEXT, field_profile_location TEXT)');
		
		//_db.execute('CREATE TABLE IF NOT EXISTS mymessages (id TEXT PRIMARY KEY, title TEXT, status TEXT)');
		
		_db.close();
		
		initialized_db = true;
	};
	
	// This returns the string value stored
	self.getValueByKey = function(key)
	{
		Ti.API.info('[_db][getValueByKey] key: ' + key);
		var returnValue = '';
		
		if(initialized_db){
			try{
				var _db = Titanium.Database.open(path);
				var resultSet = _db.execute('SELECT myValue FROM UserPreferences WHERE myKey = ?', key);
				
				if(resultSet.isValidRow()){
					returnValue = resultSet.fieldByName('myValue');
				}
				_db.close();
			}catch(err){
				Ti.API.warn('Attempted to get user preference that does not exist. Property: ' + key);
			}
			
		}else{
			Ti.API.warn('Attempted to get user preference before database initiated. Property: ' + key);
		}
		Ti.API.info('[_db][getValueByKey] returnValue: ' + returnValue);
		return returnValue;
	};
	
	// This acts like a hash to store string values
	self.updateValueByKey = function(pValue, key)
	{
		Titanium.API.info('[_db] updateValueByKey, property: ' + key + ' value: ' + pValue);
		var _db = Titanium.Database.open(path);
		var resultSet = _db.execute('SELECT * FROM UserPreferences WHERE myKey = ?', key);
		var exists = false;
		while (resultSet.isValidRow()) {
			exists = true;
			resultSet.close();
		}
		if(exists)
		{
			Titanium.API.info('[_db] exists, UPDATE');
			_db.execute('UPDATE UserPreferences SET myValue = ? WHERE myKey = ?', pValue, key);
			Titanium.API.info('[_db] updateValueByKey, completed');
		}
		else
		{
			Titanium.API.info('[_db] does not exist, INSERT');
			_db.execute('INSERT INTO UserPreferences (myKey,myValue) VALUES (?,?)', key, pValue);
			Titanium.API.info('[_db] updateValueByKey, completed');
		}
		
		_db.close();
	};
	
	// params should have: uid, field_profile_full_name, and field_photo
	self.addPastor = function(params)
	{
		Titanium.API.info('[_db] addPastor, uid: ' + params.uid + ' field_profile_full_name: ' + params.field_profile_full_name + ' field_photo: ' + params.field_photo);
		var _db = Titanium.Database.open(path);
		var resultSet = _db.execute('SELECT * FROM pastors WHERE uid = ?', params.uid);
		var exists = false;
		while (resultSet.isValidRow()) {
			exists = true;
			resultSet.close();
		}
		if(exists)
		{
			Titanium.API.info('[_db] pastor exists, UPDATE');
			_db.execute('UPDATE pastors SET field_profile_full_name = ? WHERE uid = ?', params.field_profile_full_name, params.uid);
			_db.execute('UPDATE pastors SET field_photo = ? WHERE uid = ?', params.field_photo, params.uid);
			_db.execute('UPDATE pastors SET field_profile_location = ? WHERE uid = ?', params.field_profile_location, params.uid);
			Titanium.API.info('[_db] pastors, completed');
		}
		else
		{
			Titanium.API.info('[_db] pastor does not exist, INSERT');
			_db.execute('INSERT INTO pastors (uid, field_profile_full_name, field_photo, field_profile_location) VALUES (?,?,?,?)', params.uid, params.field_profile_full_name, params.field_photo, params.field_profile_location);
			Titanium.API.info('[_db] pastors, completed');
		}
		
		_db.close();
	};
	
	self.getPastors = function(){
		var _db = Ti.Database.open(path);
		var results = [];
		var resultSet = _db.execute('SELECT * FROM pastors');
		while(resultSet.isValidRow()){
			results.push({
				uid:resultSet.fieldByName('uid'),
				field_profile_full_name:resultSet.fieldByName('field_profile_full_name'),
				field_photo:resultSet.fieldByName('field_photo'),
				field_profile_location:resultSet.fieldByName('field_profile_location')
			});
			resultSet.next();
		}
		resultSet.close();
		_db.close();
		return results;
	};
	
/*	
	self.addMessage = function(pID, pTitle){
		Titanium.API.info('[_db] addMessage');
		var _db = Titanium.Database.open(path);
		var resultSet = _db.execute('SELECT * FROM mymessages WHERE id = ?', pID);
		var exists = false;
		while (resultSet.isValidRow()) {
			exists = true;
			resultSet.close();
		}
		if(exists)
		{
			Titanium.API.info('[_db] mymessages already exists');
		}
		else
		{
			Titanium.API.info('[_db] mymessages does not exist, INSERT');
			_db.execute('INSERT INTO mymessages (id, title, status) VALUES (?,?,?)', pID, pTitle, 'NEW');
			Titanium.API.info('[_db] addMessage, completed');
		}
		var success = !exists;
		_db.close();
		return success;
	};
	
	self.getMessages = function(){
		Titanium.API.info('[_db] getMessages');
		var _db = Titanium.Database.open(path);
		var resultSet = _db.execute('SELECT * FROM mymessages M WHERE M.status != ?', 'DELETED');
		var returnArray = [];
		while (resultSet.isValidRow()) {
			var o = {
		    	id: resultSet.fieldByName('id'),
		    	title: resultSet.fieldByName('title'),
		    	status: resultSet.fieldByName('status')
		    };
		    
		    returnArray.push(o);
			resultSet.next();
		}
		resultSet.close();
		_db.close();
		return returnArray;
	};
	
	self.getMessagesByStatus = function(pStatus){
		Titanium.API.info('[_db] getMessagesByStatus');
		var _db = Titanium.Database.open(path);
		var resultSet = _db.execute('SELECT * FROM mymessages M WHERE M.status = ?', pStatus);
		var returnArray = [];
		while (resultSet.isValidRow()) {
			var o = {
		    	id: resultSet.fieldByName('id'),
		    	title: resultSet.fieldByName('title'),
		    	status: resultSet.fieldByName('status')
		    };
		    
		    returnArray.push(o);
			resultSet.next();
		}
		resultSet.close();
		_db.close();
		return returnArray;
	};
	
	self.updateMessageStatus = function(pID, pStatus){
		Titanium.API.info('[_db] updateMessageStatus');
		var _db = Titanium.Database.open(path);
		var resultSet = _db.execute('SELECT * FROM mymessages WHERE id = ?', pID);
		var exists = false;
		while (resultSet.isValidRow()) {
			exists = true;
			resultSet.close();
		}
		if(exists)
		{
			Titanium.API.info('[_db] message already exists');
			_db.execute('UPDATE mymessages SET status = ? WHERE id = ?', pStatus, pID);
		}
		else
		{
			Titanium.API.info('[_db] message does not exist!');
		}
		var success = !exists;
		_db.close();
		return success;
	};
*/	
	create_db();
	
	return self;
};
module.exports = db;