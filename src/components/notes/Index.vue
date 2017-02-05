<template>
<div class="notes" ref="notes">
  <note v-for="note in notes" :note="note"></note>
</div>
</template>

<script>
import database from '../../database'
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
  mounted () {
    let masonry = new Masonry(this.$refs.notes, {
      itemSelector: '.note',
      columnWidth: 240,
      gutter: 16,
      fitWidth: true
    })
    database.ref('notes').on('child_added', (snapshot) => {
      let note = snapshot.val()
      this.notes.unshift(note)
      this.$nextTick(() => {
        masonry.reloadItems()
        masonry.layout()
      })
    })
  }
}
</script>

<style>
.notes{
  margin: 0 auto;
}
</style>
