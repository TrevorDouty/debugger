<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="about text-center">
        <h1>Welcome {{ profile.name }}</h1>
        <img class="rounded" :src="profile.picture" alt="" />
        <p>{{ profile.email }}</p>
      </div>
    </div>
    <div class="row mb-5">
      <form type="form-group" @submit.prevent="createBug">
        <input type="text"
               class="form-control"
               aria-describedby="helpId"
               placeholder="Title"
               v-model="state.newBug.title"
        >
        <input type="text"
               class="form-control"
               aria-describedby="helpId"
               placeholder="Descriptin"
               v-model="state.newBug.description"
        >
        <button type="submit">
          Submit Bug
        </button>
      </form>
    </div>

    <bugs-component v-for="bug in bugs" :key="bug" :bugs-prop="bug" />
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import bugsComponent from '../components/bugsComponent'
export default {
  name: 'Profile',
  components: { bugsComponent },
  setup() {
    const state = reactive({
      newBug: {}
    })
    onMounted(() => bugsService.getBugs())
    return {
      toggled: false,
      items: [
        { color: '#E8D2AE', value: false },
        { color: '#CB8589', value: false },
        { color: '#796465', value: false },
        { color: '#79BD8F', value: false },
        { color: '#00A388', value: false }
      ],
      state,
      bugs: computed(() => AppState.bugs),
      profile: computed(() => AppState.profile),
      createBug() {
        bugsService.createBugs(state.newBug)
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
