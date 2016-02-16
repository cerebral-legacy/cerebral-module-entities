var getCompiler = require('cerebral-url-scheme-compiler/get');
var getKeys = require('./helpers/getKeys.js');
var createEntity = require('./core/createEntity.js');

function newEntity(entityType, fromPath) {

  var getValue;
  if (typeof fromPath === 'string') {
    getValue = getCompiler(fromPath);
  } else {
    getValue = function () {
      return fromPath;
    };
  }

  function action(args) {
    var input = args.input;
    var output = args.output;
    var modules = args.modules;
    var pathValue = getValue(args);

    var module = modules['cerebral-module-entities']
    var meta = module.meta || {};
    var keys = getKeys(entityType, meta);
    var entity = createEntity(pathValue, entityType, keys, module);
    module.state.set([entityType, entity[keys.uuid]], entity);

    var outputData = {};
    outputData[keys.uuid] = entity[keys.uuid];
    output(outputData);

  }

  action.displayName = 'entities.newEntity (' + entityType + ')';

  return action;

}

module.exports = newEntity;
