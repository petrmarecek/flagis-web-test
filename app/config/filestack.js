import * as filestack from 'filestack-js'

export default {
  apikey: 'AZKXjn4XHQKOkFquBLe1Wz',
  url: 'https://cdn.filestackcontent.com/',
  security: {
    policy: 'eyJleHBpcnkiOjE1Nzc4MzMyMDB9',
    signature:
      '9c9788d2a89a6e5a44267bc875cf18ed9ca03a159e61d3ce400c8a55603e50df',
  },

  get filestackInit() {
    return filestack.init(this.apikey)
  },

  get filestackUrlLength() {
    return this.url.length
  },
}
