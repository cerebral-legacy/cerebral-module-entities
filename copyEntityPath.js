var getCompiler = require('cerebral-url-scheme-compiler/get')
var setCompiler = require('cerebral-url-scheme-compiler/set')

function copyEntityPath (entityType, uuidPath, copyPath) {
  var getUuid = getCompiler(uuidPath)
  var setValue = setCompiler(copyPath)

  function action (args) {
    var module = args.modules['cerebral-module-entities']
    var uuid = getUuid(args)
    var entityPath = null

    if (!uuid) {
      throw Error('cerebral-module-entities: The UUID can not be found at path ' + uuidPath)
    }

    if (module.state.get([entityType, uuid])) {
      entityPath = [entityType, uuid]
    } else if (module.state.get(['ids', entityType, uuid])) {
      uuid = module.state.get(['ids', entityType, uuid])
      if (!uuid) {
        throw Error('cerebral-module-entities: The UUID can not be found ' + uuidPath)
      }
      entityPath = [entityType, uuid]
    }

    setValue(args, entityPath)
  }

  action.displayName = 'entities.copyEntityPath (' + entityType + ')'

  return action
}

module.exports = copyEntityPath
