var getCompiler = require('cerebral-url-scheme-compiler/get');

function entityHas(entityType, uuidPath, keys) {

  function action(args) {

    var output = args.output;
    var state = args.state;
    var module = args.modules['cerebral-module-entities'];
    var getValue = getCompiler(uuidPath);
    var uuid = getValue(args);
    if (!uuid) {
      throw Error('cerebral-module-entities: The UUID can not be found at path ' + uuidPath);
    }

    if (!state.get(module.path.concat([entityType, uuid]))) {
      uuid = state.get(module.path.concat(['ids', entityType, uuid]));
    }

    if (!uuid) {
      output.no();
      return;
    }

    var entity = state.get(module.path.concat([entityType, uuid]));
    var hasKeys = keys.reduce(function (hasKeys, key) {
      return hasKeys || !!(key in entity);
    }, false);

    hasKeys ? output.yes() : output.no();

  }

  action.outputs = ['yes', 'no'];
  action.displayName = 'entities.entityHas (' + ([].slice.call(arguments).join(', ')) + ')';

  return action;

}

module.exports = entityHas;
