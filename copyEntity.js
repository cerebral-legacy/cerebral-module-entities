var getCompiler = require('cerebral-url-scheme-compiler/get')
var setCompiler = require('cerebral-url-scheme-compiler/set')

function copyEntity (entityType, uuidPath, copyPath) {
  var getUuid = getCompiler(uuidPath)
  var setValue = setCompiler(copyPath)

  function action (args) {
    var state = args.state
    var module = args.modules['cerebral-module-entities']
    var uuid = getUuid(args)
    var entity = null
    var path = []

    if (!uuid) {
      throw Error('cerebral-module-entities: The UUID can not be found at path ' + uuidPath)
    }

    if (state.get(module.path.concat([entityType, uuid]))) {
      path = [entityType, uuid]
    } else if (state.get(module.path.concat(['ids', entityType, uuid]))) {
      path = [entityType, state.get(module.path.concat(['ids', entityType, uuid]))]
    }

    entity = state.get(module.path.concat(path))

    if (!entity) {
      throw Error('cerebral-module-entities: The ENTITY can not be found at path ' + path)
    }

    setValue(args, entity)
  }

  action.displayName = 'entities.copyEntity (' + ([].slice.call(arguments).join(', ')) + ')'

  return action
}

module.exports = copyEntity
