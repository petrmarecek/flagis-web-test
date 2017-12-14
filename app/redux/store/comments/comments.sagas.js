import { call, put } from 'redux-saga/effects'
import { fetch } from 'redux/store/common.sagas'
import * as actions from 'redux/store/comments/comments.action'
import api from 'redux/utils/api'
import schema from 'redux/data/schema'

const COMMENTS = actions.COMMENTS

export function* fetchComment(action) {
  yield* fetch(COMMENTS.FETCH, {
    method: api.comments.get,
    args: [action.payload],
    schema: schema.commentList
  })
}

export function* createComment(action) {
  try {
    // TODO: implement optimistic insert
    const taskId = action.payload.taskId
    const content = action.payload.content
    const comment = yield call(api.comments.create, taskId, content)

    yield put(actions.addComment(comment))

  } catch(err) {
    console.error('Cannot create comment.', err)
    // TODO: handle error
  }
}

export function* deleteComment(action) {
  try {
    const taskId = action.payload.taskId
    const commentId = action.payload.commentId
    yield call(api.comments.delete, taskId, commentId)

  } catch(err) {
    console.error('Cannot delete comment.', err)
    // TODO: handle error
  }
}
