import { Set, Map, List } from 'immutable'
import typeToReducer from 'type-to-reducer'

import { AUTH } from '../auth/auth.actions'
import { TAGS } from './tags.actions'
import { TASKS } from '../tasks/tasks.actions'
import { TREE } from '../tree/tree.actions'
import { TagStore } from '../../data/records'

export default typeToReducer(
  {
    [TAGS.FETCH]: {
      PENDING: state => state.setIn(['all', 'isFetching'], true),

      FULFILLED: (state, action) => {
        const tagIds = List(action.payload.result)
        return state
          .setIn(['all', 'isFetching'], false)
          .setIn(['all', 'items'], tagIds)
      },
    },

    [TAGS.FIREBASE]: {
      FULFILLED: (state, action) => {
        // Get new list for tags store
        const newItems = updateTagsListFromFirestore(state, action)

        return state.setIn(['all', 'items'], newItems)
      },
    },

    [TAGS.SET_ACTIVE_TAGS]: (state, action) =>
      state.setIn(['activeTags'], List(action.payload.tagIds)),

    [TAGS.ADD]: (state, action) => {
      const { tag } = action.payload
      const tagsItems = state.getIn(['all', 'items'])

      if (tagsItems.includes(tag.id)) {
        return state
      }

      return state.updateIn(['all', 'items'], list =>
        list.push(action.payload.tag.id)
      )
    },

    [TAGS.REPLACE]: (state, action) =>
      state
        .updateIn(['all', 'items'], tagList => {
          const tagIndex = tagList.indexOf(action.payload.originalTagId)
          return tagList.splice(tagIndex, 1, action.payload.tag.id)
        })
        .updateIn(['relations'], tagList => {
          return tagList.mapKeys(key => {
            if (key === action.payload.originalTagId) {
              return action.payload.tag.id
            } else {
              return key
            }
          })
        }),

    [TAGS.SELECT]: (state, action) =>
      state.set('current', action.payload.tagId),

    [TAGS.DESELECT]: state => state.set('current', null),

    [TAGS.UPDATE_SEARCH]: (state, action) =>
      state.setIn(['search'], action.payload.search),

    [TAGS.DELETE]: (state, action) =>
      state.updateIn(['all', 'items'], list =>
        list.delete(list.indexOf(action.payload.originalData.id))
      ),

    [TAGS.FETCH_TAGS_RELATIONS]: {
      FULFILLED: (state, action) => saveTagsRelations(action.payload, state),
    },

    [TAGS.ADD_TAGS_RELATIONS]: (state, action) =>
      state.updateIn(['relations', action.payload.tagId], set => {
        return set
          ? set.add(action.payload.taskId)
          : Set([action.payload.taskId])
      }),

    [TAGS.DELETE_TAGS_RELATIONS]: (state, action) => {
      return action.payload.taskId === null
        ? state.deleteIn(['relations', action.payload.tagId])
        : state.updateIn(['relations', action.payload.tagId], set =>
            set.delete(action.payload.taskId)
          )
    },

    // ------ Tasks -------------------------------------------------------------
    [TASKS.FIREBASE_TAGS_RELATIONS]: (state, action) =>
      updateTagsRelations(action.payload, state),

    [TASKS.ADD_TASK_TAG]: (state, action) =>
      state.updateIn(['all', 'items'], list =>
        list
          .toSet()
          .union(new Set([action.payload.tag.id]))
          .toList()
      ),

    [TASKS.ADD_TASK_TAG_STORE]: (state, action) =>
      state.updateIn(['all', 'items'], list =>
        list
          .toSet()
          .union(new Set([action.payload.tag.id]))
          .toList()
      ),

    // ------ Tree --------------------------------------------------------------
    [TREE.ADD]: (state, action) => {
      const tagIds = Object.keys(action.payload.entities.tags || {})
      return state.updateIn(['all', 'items'], list =>
        list.toSet().union(new Set(tagIds)).toList()
      )
    },

    [TREE.UPDATE]: {
      FULFILLED: (state, action) => {
        const tagIds = Object.keys(action.payload.entities.tags || {})
        return state.updateIn(['all', 'items'], list =>
          list.toSet().union(new Set(tagIds)).toList()
        )
      },
    },

    // ------ Auth --------------------------------------------------------------
    [AUTH.LOGOUT]: () => new TagStore(),
  },
  new TagStore()
)

function saveTagsRelations(payload, state) {
  const relations = Object.keys(payload).reduce((result, key) => {
    result[key] = new Set(payload[key])

    return result
  }, {})

  return state.mergeIn(['relations'], Map(relations))
}

// Update tags relations
function updateTagsRelations(payload, state) {
  const tasks = payload
  let relations = Map()

  tasks.forEach(task => {
    const { id, tags } = task

    // Relations of tasks and tags
    tags.forEach(tag => {
      relations = relations.updateIn([tag], set => {
        return set ? set.add(id) : Set([id])
      })
    })
  })

  return state.setIn(['relations'], relations)
}

// Update tag list
function updateTagsListFromFirestore(state, action) {
  const tags = action.payload.entities.tags
  const resultId = action.payload.result
  const { id, isDeleted } = tags[resultId]

  let newItems = state.getIn(['all', 'items'])

  // New tag
  if (!isDeleted && !newItems.includes(id)) {
    newItems = newItems.push(id)

    return newItems
  }

  // Delete tag
  if (isDeleted) {
    newItems = newItems.filter(tagId => tagId !== id)

    return newItems
  }

  return newItems
}
