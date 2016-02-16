module.exports = function (entityType, meta) {
  var uuidKey = (meta.uuidKeys || {})[entityType] || 'uuid'
  var idKey = (meta.idKeys || {})[entityType] || 'id'

  return {
    uuid: uuidKey,
    id: idKey
  }
}
