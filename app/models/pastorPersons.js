exports.definition = {
	config: {
		columns: {
		    "uid": "TEXT PRIMARY KEY",
		    "title": "TEXT",
		    "leftImage": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "pastorPersons",
			idAttribute: "uid"
		}
	},		
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});
		
		return Model;
	},
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});
		
		return Collection;
	}
}

