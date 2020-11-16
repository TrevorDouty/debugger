<template>
  <div class="active-bug">
    <h2>
      {{ bugs.title }}
    </h2>
    <p>{{ bugs.description }}</p>
    <div class="modal" id="editBugModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">
              Edit Bug
            </h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <input class="form-control text-center" type="text" placeholder="Bug Title" v-model="state.newBug.title">
            <input class="form-control text-center" type="text" placeholder="edit bug" v-model="state.newBug.description">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Close
            </button>
            <button @click="editBug" data-dismiss="modal">
              Confirm Edit
            </button>
          </div>
        </div>
      </div>
    </div>
    <button v-show="!bugs.closed" type="button" class="btn btn-primary" data-toggle="modal" data-target="#editBugModal">
      Edit
    </button>
    <button @click="deleteBug">
      Bug Fixed
    </button>
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
      newBug: {},
      description: ''
    })
    onMounted(() =>
      bugsService.getActiveBug(route.params.bugId))
    onMounted(() => notesService.getNotes(route.params.bugId))
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
      },

      editBug() {
        bugsService.editBug(route.params.bugId, state.newBug)
      },

      deleteBug() {
        bugsService.deleteBug(route.params.bugId)
      }

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
