<template>
  <div class="notes-component">
    <p>{{ notes.description }}</p>
    <p>{{ notes.createdAt }}</p>
    <p>{{ notes.updatedAt }}</p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'NotesComponent',
  props: ['notesProp'],
  setup(props) {
    return {
      note: computed(() => AppState.notes),
      profile: computed(() => AppState.profile),
      notes: computed(() => props.notesProp)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
