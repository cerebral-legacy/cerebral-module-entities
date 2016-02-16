var getCompiler = require('cerebral-url-scheme-compiler/get')

function remove (entityType, valuePath) {
  var getValue = getCompiler(valuePath)

  function action (args) {
    var value = getValue(args)
    args.modules['cerebral-module-entities'].state.unset([entityType, value])
  }

  action.displayName = 'entities.removeEntity (' + entityType + ')'

  return action
}

export default remove
