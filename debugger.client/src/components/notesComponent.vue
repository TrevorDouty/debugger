<template>
  <div class="notes-component">
    <p>{{ notes.description }}</p>
    <p> Created:{{ notes.createdAt }}</p>
    <p>Last Update:{{ notes.updatedAt }}</p>
    <button @click="deleteNote">
      Delete Note
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
export default {
  name: 'NotesComponent',
  props: ['notesProp'],
  setup(props) {
    return {
      note: computed(() => AppState.notes),
      profile: computed(() => AppState.profile),
      notes: computed(() => props.notesProp),

      deleteNote() {
        notesService.deleteNote(props.notesProp)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
