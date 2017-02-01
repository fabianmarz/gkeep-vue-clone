<template>
<form @submit.prevent="createNote" class="create-note">
  <input type="text" name="title" v-model="title">
  <textarea name="content" v-model="content"></textarea>
  <button type="submit">+</button>
</form>
</template>

<script>
import database from '../../database'

export default {
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    createNote () {
      let payload = {
        title: this.title,
        content: this.content
      }
      database.ref('notes').push(payload)
        .then((data) => {
          console.log(data.key)
        })
    }
  }
}
</script>

<style>
form.create-note {
  position: relative;
  width: 480px;
  margin: 15px auto;
  background: #fff;
  padding: 15px;
  border-radius: 2px;
  box-shadow: 0 1px 5px #ccc;
}

form.create-note input, form.create-note textarea {
  width: 100%;
  border: none;
  padding: 4px;
  outline: none;
  font-size: 1.2em;
}

form.create-note button {
  position: absolute;
  right: 18px;
  bottom: -18px;
  background: #41b883;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  cursor: pointer;
  outline: none;
}
</style>
