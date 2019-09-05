const _ = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId;

function objectNameFinder(wobject) {
    const filteredFields = wobject.fields.filter(object => object.name === "name");
    const heavyFieldsTransformed = _.map(filteredFields, obj => {
        obj.newId = new ObjectId(obj._id);
        return obj;
    });
    const sortedFields = _.orderBy(heavyFieldsTransformed, ['weight', 'newId'], ['desc', 'desc']);

    return _.get(sortedFields, '[0].body');
}

module.exports = objectNameFinder;