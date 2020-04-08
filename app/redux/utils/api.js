import axios from 'axios'
import config from 'config'

const api = axios.create({
  baseURL: `${config.apiURL}/v1`,
})

/**
 * We need to prevent sending Flagis access token to any external API (e.g. AWS). That's why
 * we need this second axios instance that will not pass current access token to the Authorization
 * header. Axios >=0.19.1 is needed because of this bug: https://github.com/axios/axios/pull/1395
 */
const externalAPI = axios.create()

export default {
  setApiToken(accessToken) {
    // send token with every request
    api.defaults.headers.common['Authorization'] = accessToken
  },

  clearApiToken() {
    Reflect.deleteProperty(api.defaults.headers.common, 'Authorization')
  },

  auth: {
    login: userData => api.post('auth/native', userData).then(res => res.data),

    token: data => api.post('auth/token', data).then(res => res.data),
  },

  users: {
    create: userData => api.post('users', userData).then(res => res.data),

    update: userData => api.patch('users', userData).then(res => res.data),

    updatePhoto: photoData =>
      api.patch('users/photo', photoData).then(res => res.data),

    resetPhoto: () => api.patch('users/photo/reset').then(res => res.data),

    password: userData =>
      api.put('users/password', userData).then(res => res.data),

    emailResetPassword: userData =>
      api.post('users/reset-password', userData).then(res => res.data),

    resetPassword: userData =>
      api.put('users/reset-password', userData).then(res => res.data),
  },

  invitation: {
    email: invitationId =>
      api.get(`invitation/${invitationId}`).then(res => res.data),
  },

  tasks: {
    list: () => api.get('tasks').then(res => res.data),

    inbox: () => api.get('inbox').then(res => res.data),

    search: search => api.post('tasks/search', search).then(res => res.data),

    create: taskWithTags =>
      api.post('tasks', taskWithTags).then(res => res.data),

    update: (taskId, update) =>
      api.patch(`tasks/${taskId}`, update).then(res => res.data),

    setTags: (taskId, tags) =>
      api.put(`tasks/${taskId}/tags`, tags).then(res => res.data),

    delete: taskId => api.delete(`tasks/${taskId}`).then(res => res.data),
  },

  tags: {
    list: () => api.get('tags').then(res => res.data),

    create: tag => api.post('tags', tag).then(res => res.data),

    update: (tagId, update) =>
      api.patch(`tags/${tagId}`, update).then(res => res.data),

    delete: tagId => api.delete(`tags/${tagId}`).then(res => res.data),

    relations: () => api.get('tags/relations').then(res => res.data),
  },

  tree: {
    create: item => api.post('tree', item).then(res => res.data),

    delete: treeItemId =>
      api.delete(`tree/${treeItemId}`).then(res => res.data),

    updateTitle: (treeItemId, title) =>
      api.put(`tree/${treeItemId}/title`, { title }).then(res => res.data),

    updateParent: (treeItemId, update) =>
      api.put(`tree/${treeItemId}/parent`, update).then(res => res.data),

    get: () => api.get('tree').then(res => res.data),
  },

  activities: {
    get: taskId => api.get(`tasks/${taskId}/activities`).then(res => res.data),
  },

  notifications: {
    list: () => api.get('notifications').then(res => res.data),
    readAll: () => api.put('notifications').then(res => res.data),
    read: notificationId =>
      api.put(`notifications/${notificationId}`).then(res => res.data),
    taskReadAll: taskId =>
      api.put(`tasks/${taskId}/notifications`).then(res => res.data),
  },

  comments: {
    create: (taskId, content) =>
      api.post(`tasks/${taskId}/comments`, content).then(res => res.data),

    get: taskId => api.get(`tasks/${taskId}/comments`).then(res => res.data),

    delete: (taskId, commentId) =>
      api.delete(`tasks/${taskId}/comments/${commentId}`).then(res => res.data),
  },

  attachments: {
    create: (taskId, data) =>
      api.post(`tasks/${taskId}/attachments`, data).then(res => res.data),

    get: taskId => api.get(`tasks/${taskId}/attachments`).then(res => res.data),

    delete: (taskId, attachmentId) =>
      api
        .delete(`tasks/${taskId}/attachments/${attachmentId}`)
        .then(res => res.data),
  },

  contacts: {
    create: data => api.post('contacts', data).then(res => res.data),

    get: () => api.get('contacts').then(res => res.data),

    update: (contactId, update) =>
      api.patch(`contacts/${contactId}`, update).then(res => res.data),

    invitation: contactId =>
      api.post(`contacts/${contactId}/invitation`).then(res => res.data),

    delete: contactId =>
      api.delete(`contacts/${contactId}`).then(res => res.data),
  },

  followers: {
    create: (taskId, data) =>
      api.post(`tasks/${taskId}/followers`, data).then(res => res.data),

    send: taskId =>
      api.put(`tasks/${taskId}/followers/send`).then(res => res.data),

    accept: taskId =>
      api.put(`tasks/${taskId}/followers/accept`).then(res => res.data),

    reject: taskId =>
      api.put(`tasks/${taskId}/followers/reject`).then(res => res.data),

    delete: (taskId, userId) =>
      api.delete(`tasks/${taskId}/followers/${userId}`).then(res => res.data),
  },

  contactUs: {
    create: data => api.post(`contact-us`, data).then(res => res.data),
  },

  files: {
    getUploadData: data => api.post(`uploads`, data).then(res => res.data),
    uploadFile: (uploadUrl, data, contentType) =>
      externalAPI
        .put(uploadUrl, data, {
          headers: {
            'Content-Type': contentType,
          },
        })
        .then(res => res.data),
  },

  stats: {
    getStats: () => api.get(`stats`).then(res => res.data),
  }
}
