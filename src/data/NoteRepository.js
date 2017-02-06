import database from '../database.js'
import EventEmitter from 'events'

class NoteRepository extends EventEmitter {

  constructor () {
    super()
    this.ref = database.ref('notes')
    this.attachFirebaseListeners()
  }

  create ({title = '', content = ''}, onComplete) {
    this.ref.push({title, content}, onComplete)
  }

  update ({key, title = '', content = ''}, onComplete) {
    this.ref.child(key).update({title, content}, onComplete)
  }

  remove ({key}, onComplete) {
    this.ref.child(key).remove(onComplete)
  }

  attachFirebaseListeners () {
    this.ref.on('child_added', this.onAdded, this)
    this.ref.on('child_removed', this.onRemoved, this)
    this.ref.on('child_changed', this.onChanged, this)
  }

  onAdded (snapshot) {
    let note = this.snapshotToNote(snapshot)
    this.emit('added', note)
  }

  onRemoved (snapshot) {
    let note = this.snapshotToNote(snapshot)
    this.emit('removed', note)
  }

  onChanged (snapshot) {
    let note = this.snapshotToNote(snapshot)
    this.emit('changed', note)
  }

  snapshotToNote (snapshot) {
    let key = snapshot.key
    let note = snapshot.val()
    note.key = key
    return note
  }

  findIndex (notes, key) {
    return notes.findIndex(note => note.key === key)
  }

  find (notes, key) {
    return notes.find(note => note.key === key)
  }
}

export default new NoteRepository()
