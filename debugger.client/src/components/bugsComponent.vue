<template>
  <div class="bugs-component d-flex justify-content-around text-center row outline-dark">
    <h5 class=" border border-dark col-3">
      <router-link :to="{name: 'ActiveBug' , params: {bugId: bugsProp._id}}">
        {{ bug.title }}
      </router-link>
    </h5>
    <p class="  border border-dark col-3">
      {{ bug.description }}
    </p>
    <button class=" text-center  border border-dark col-3" v-show="!bug.closed" @click="bug.closed = !bug.closed">
      Open/Closed
    </button>
    <span v-show="bug.closed" class="text-center ">Closed</span>
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

<style lang="scss" scoped>

</style>
