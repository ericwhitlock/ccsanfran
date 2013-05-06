exports.definition = {
    config: {
        columns: {
            uid: "TEXT PRIMARY KEY",
            title: "TEXT",
            leftImage: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "pastorPersons",
            idAttribute: "uid"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("pastorPersons", exports.definition, []);

collection = Alloy.C("pastorPersons", exports.definition, model);

exports.Model = model;

exports.Collection = collection;