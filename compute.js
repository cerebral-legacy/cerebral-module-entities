function compute (entityTypePath, uuidPath, relationships) {
  entityTypePath = typeof entityTypePath === 'string' ? entityTypePath.split('.') : entityTypePath

  function computed (get) {
    var getEntity = function (uuid) {
      var ensuredUuid = uuid

      var uuidById = get([entityTypePath[0], 'ids', entityTypePath[1], uuid])
      if (uuidById) {
        ensuredUuid = uuidById
      }

      var entity = get(entityTypePath.concat(ensuredUuid))

      if (!entity) {
        return {
          id: uuidById ? uuid : uuidById,
          uuid: uuidById || uuid,
          $notFound: true
        }
      }

      if (relationships) {
        return Object.keys(entity).reduce(function (newEntity, key) {
          if (relationships[key] && Array.isArray(entity[key])) {
            newEntity[key] = entity[key].map(function (uuid) {
              return get(relationships[key]({
                isRelationship: true,
                uuid: uuid
              }))
            })
          } else if (relationships[key]) {
            newEntity[key] = get(relationships[key]({
              isRelationship: true,
              uuid: entity[key]
            }))
          } else {
            newEntity[key] = entity[key]
          }

          return newEntity
        }, {})
      }
      return entity
    }

    var uuid
    if (uuidPath.isRelationship) {
      uuid = uuidPath.uuid
    } else {
      uuid = get(uuidPath)
    }

    if (Array.isArray(uuid)) {
      return uuid.map(getEntity)
    }

    return uuid ? getEntity(uuid) : null
  }

  computed.computedRef = JSON.stringify(arguments)
  return computed
}

module.exports = compute
