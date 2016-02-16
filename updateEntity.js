var getCompiler = require('cerebral-url-scheme-compiler/get');
var getKeys = require('./helpers/getKeys.js');

function updateEntity(entityType, uuidPath, dataPath) {

  var getUuidValue;
  if (typeof uuidPath === 'string') {
    getUuidValue = getCompiler(uuidPath);
  } else {
    getUuidValue = function () {
      return uuidPath;
    };
  }

  var getDataValue;
  if (typeof dataPath === 'string') {
    getDataValue = getCompiler(dataPath);
  } else {
    getDataValue = Object.keys(dataPath).reduce(function (newDataPath, key) {
      newDataPath[key] = getCompiler(dataPath[key]);
      return newDataPath;
    }, {});
  }

  function action(args) {
    var input = args.input;
    var state = args.state;
    var output = args.output;
    var modules = args.modules;

    var module = modules['cerebral-module-entities'];
    var meta = module.meta || {};
    var keys = getKeys(entityType, meta);
    var uuid = getUuidValue(args);
    var ensuredUuid = uuid;
    var uuidById = state.get(module.path.concat(['ids', entityType, uuid]));
    if (uuidById) {
      ensuredUuid = uuidById;
    }

    var data = typeof getDataValue === 'function' ? getDataValue(args) : Object.keys(getDataValue).reduce(function (data, key) {
      data[key] = getDataValue[key](args);
      return data;
    }, {});

    var ids = state.get(module.path.concat(['ids']));
    if (!ids) {
      ids = {};
      state.set(module.path.concat([entityType], ids));
    }
    if (data[keys.id] && !ids[entityType]) {
      state.set(module.path.concat(['ids', entityType], {}));
    }

    ids = state.get(module.path.concat(['ids']));

    if (data[keys.id] && !ids[entityType][data[keys.id]]) {
      state.set(module.path.concat(['ids', entityType, data[keys.id]]), ensuredUuid);
    }

    state.merge(module.path.concat([entityType, ensuredUuid]), data);

    output({uuid: ensuredUuid});

  }

  action.displayName = 'entities.updateEntity (' + ([].slice.call(arguments).join(', '))+ ')';

  return action;

}

module.exports = updateEntity;
