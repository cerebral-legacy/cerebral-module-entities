var uuid = require('uuid')

module.exports = function createEntity (entitySource, entityType, keys, module, state) {
  var copy = Object.keys(entitySource).reduce(function (entity, key) {
    entity[key] = entitySource[key]
    return entity
  }, {})

  var ids = state.get(module.path.concat(['ids']))
  if (!ids) {
    ids = {}
    state.set(module.path.concat([entityType]), ids)
  }

  if (keys.id in copy) {
    copy[keys.uuid] = ids[entityType] && ids[entityType][copy[keys.id]] ? ids[entityType][copy[keys.id]] : uuid.v1()
    state.set(module.path.concat(['ids', entityType, copy[keys.id]]), copy[keys.uuid])
  } else {
    copy[keys.uuid] = uuid.v1()
  }

  return copy
}
