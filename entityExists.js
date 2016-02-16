var getCompiler = require('cerebral-url-scheme-compiler/get')

function entityExists (entityType, uuidPath) {
  function action (args) {
    var output = args.output
    var module = args.modules['cerebral-module-entities']
    var getValue = getCompiler(uuidPath)
    var uuid = getValue(args)
    if (!uuid) {
      throw Error('cerebral-module-entities: The UUID can not be found at path ' + uuidPath)
    }

    var byUuid = module.state.get([entityType, uuid])
    var byId = module.state.get(['ids', entityType]) && module.state.get(['ids', entityType, uuid])

    byUuid || byId ? output.yes() : output.no()
  }

  action.outputs = ['yes', 'no']
  action.displayName = 'entities.entityExists (' + ([].slice.call(arguments).join(', ')) + ')'

  return action
}

module.exports = entityExists
