<template>
<div class="notes">
  <note v-for="note in notes" :note="note"></note>
</div>
</template>

<script>
import database from '../../database'
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
    database.ref('notes').on('child_added', (snapshot) => {
      this.notes.unshift(snapshot.val())
    })
  }
}
</script>

<style>
.notes {
  padding: 0 100px;
}
</style>
