const _ = require('lodash');

const {objectNameFinder} = require('../postConstructor/index');

function wobjectValidator (wobject) {
    if (!_.isEmpty(wobject)) {
        const {author_permlink, fields} = wobject;
        if (!_.isEmpty(author_permlink) && !_.isEmpty(fields)) {
            const fieldsWithNameEqualName = fields.filter( object => object.name === "name");

            if (!_.isEmpty(fieldsWithNameEqualName)) {
                const body = (objectNameFinder(wobject));
                if (!_.isEmpty(body)) {
                    return true;
                }
            }
        }
    }
    return false;
}

module.exports = wobjectValidator;
