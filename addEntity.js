var getCompiler = require('cerebral-url-scheme-compiler/get');
var createEntity = require('./core/createEntity');
var getKeys = require('./helpers/getKeys');

function addEntity(entityType, fromPath) {

  var getValue = getCompiler(fromPath);

  function action(args) {
    var input = args.input;
    var output = args.output;
    var state = args.state;
    var modules = args.modules;
    var pathValue = getValue(args);

    var module = modules['cerebral-module-entities'];
    var meta = module.meta || {};
    var keys = getKeys(entityType, meta);

    var checkExisting = function (entity) {
      if (state.get(module.path.concat(['ids', entityType])) && state.get(module.path.concat(['ids', entityType, entity[keys.id]]))) {
        return state.get(module.path.concat([entityType, state.get(module.path.concat(['ids', entityType, entity[keys.id]]))]));
      }
      return null;
    }

    if (Array.isArray(pathValue)) {

      var entities = pathValue.reduce(function (entities, entity) {
        var existingEntity = entity[keys.id] ? checkExisting(entity) : null;
        if (existingEntity) {
          existingEntity = Object.keys(existingEntity).reduce(function (copy, key) {
            copy[key] = existingEntity[key];
            return copy;
          }, {});
          entities[existingEntity[keys.uuid]] = Object.keys(entity).reduce(function (existingEntity, key) {
            existingEntity[key] = entity[key];
            return existingEntity;
          }, existingEntity);
        } else {
          var newEntity = createEntity(entity, entityType, keys, module, state)
          entities[newEntity[keys.uuid]] = newEntity;
        }
        return entities;
      }, {});

      if (!state.get(module.path.concat([entityType]))) {
        state.set(module.path.concat([entityType]), {});
      }
      state.merge(module.path.concat([entityType]), entities);

      var outputData = {};
      outputData[keys.uuid + 's'] = Object.keys(entities);
      outputData[keys.id + 's'] = Object.keys(entities).map(function (key) {
        return entities[key][keys.id];
      });
      output(outputData);

    } else {

      var existingEntity = pathValue[keys.id] ? checkExisting(pathValue) : null;
      var entity = existingEntity;
      if (existingEntity) {
        state.merge(module.path.concat([entityType, existingEntity[keys.uuid]]), pathValue);
      } else {
        entity = createEntity(pathValue, entityType, keys, module, state);
        state.set(module.path.concat([entityType, entity[keys.uuid]]), entity);
      }

      var outputData = {};
      outputData[keys.uuid] = entity[keys.uuid];
      outputData[keys.id] = entity[keys.id];
      output(outputData);

    }

  }

  action.displayName = 'entities.addEntity (' + entityType + ')';

  return action;

}

module.exports = addEntity;
