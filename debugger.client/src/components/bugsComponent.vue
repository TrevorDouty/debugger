<template>
  <div class=" bugs-component d-flex justify-content-around text-center row outline-dark">
    <h5 class=" border border-dark col-3">
      <router-link :to="{name: 'ActiveBug' , params: {bugId: bugsProp._id}}">
        {{ bug.title }}
      </router-link>
    </h5>
    <p class="  border border-dark col-3">
      {{ bug.description }}
    </p>
    <span v-show="!bug.closed" class="text-center">Open</span>
    <span v-show="bug.closed" class="text-center">Closed</span>
    <p class="col-3 border border-dark">
      {{ bug.updatedAt }}
    </p>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed } from 'vue'
export default {
  name: 'BugsComponent',
  props: ['bugsProp'],

  setup(props) {
    return {

      bugs: computed(() => AppState.bugs),
      profile: computed(() => AppState.profile),
      bug: computed(() => props.bugsProp)

    }
  },
  components: { }
}
</script>

<style scoped>
.red{
  background-color: red;
}

</style>
