import lunr from 'lunr'

const createTasksIndex = () => lunr(function () {
  this.ref('id')
  this.field('subject', { boost: 10 })
  // this.field('description', { boost: 5 })

  this.pipeline.remove(lunr.stopWordFilter);
  this.pipeline.remove(lunr.trimmer);
  this.pipeline.remove(lunr.stemmer);
})

const createTagsIndex = () => lunr(function () {
  this.ref('id')
  this.field('title', { boost: 10 })
  this.field('description')

  this.pipeline.remove(lunr.stopWordFilter);
  this.pipeline.remove(lunr.trimmer);
  this.pipeline.remove(lunr.stemmer);
})

class SearchService {

  constructor(indexInitializer) {
    this.createIndex = indexInitializer
    this.index = this.createIndex()
  }

  addItem(item) {
    this.index.add(item)
  }

  addItems(items) {
    items.forEach(item => this.addItem(item))
  }

  get(term) {
    return this.index.search(term)
  }

  removeItem(item) {
    this.index.remove(item)
  }

  resetIndex() {
    this.index = this.createIndex()
  }

  updateItem(item) {
    this.index.update(item)
  }
}

export default {
  tasks: new SearchService(createTasksIndex),
  tags: new SearchService(createTagsIndex),
}
