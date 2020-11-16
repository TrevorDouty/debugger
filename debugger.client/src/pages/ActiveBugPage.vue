<template>
  <div class="active-bug">
    <h2>
      {{ bugs.title }}
    </h2>
    <p>{{ bugs.description }}</p>
    <form class="form-group" @submit.prevent="createNote">
      <input class="form-control text-center" type="text" placeholder="New Note" v-model="state.description">
      <button type="submit">
        Add Note
      </button>
    </form>
    <div>
      <notes-component v-for="note in notes" :key="note" :notes-prop="note" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService'
export default {
  name: 'ActiveBug',
  props: ['bugsProp'],
  setup(props) {
    const route = useRoute()
    const state = reactive({
      newNote: {},
      description: ''
    })
    onMounted(() =>
      bugsService.getActiveBug(route.params.bugId),
    notesService.getNotes(route.params.bugId))
    return {
      state,
      profile: computed(() => AppState.profile),
      bugs: computed(() => AppState.activeBug),
      bug: computed(() => props.bugsProp),
      notes: computed(() => AppState.notes),

      createNote() {
        notesService.createNote(state.description, route.params.bugId)
        state.description = ''
        notesService.getNotes(route.params.bugId)
      }

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
