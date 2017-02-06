<template>
<div class="notes" ref="notes">
  <note v-for="note in notes" :note="note"></note>
</div>
</template>

<script>
import noteRepository from '../../data/NoteRepository'
import Masonry from 'masonry-layout'
import Note from './Note'

export default {
  components: {
    Note
  },
  data () {
    return {
      notes: []
    }
  },
  watch: {
    'notes': {
      handler () {
        this.masonry.reloadItems()
        this.masonry.layout()
      },
      deep: true
    }
  },
  mounted () {
    this.masonry = new Masonry(this.$refs.notes, {
      itemSelector: '.note',
      columnWidth: 240,
      gutter: 16,
      fitWidth: true
    })
    noteRepository.on('added', (note) => {
      this.notes.unshift(note)
    })
    noteRepository.on('changed', ({key, title, content}) => {
      let outdatedNote = noteRepository.find(this.notes, key)
      outdatedNote.title = title
      outdatedNote.content = content
    })
    noteRepository.on('removed', ({key}) => {
      let noteToRemove = noteRepository.findIndex(this.notes, key)
      this.notes.splice(noteToRemove, 1)
    })
  }
}
</script>

<style>
.notes{
  margin: 0 auto;
}
</style>
