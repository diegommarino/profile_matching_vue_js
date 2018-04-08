<template>
  <div id="bootstrap-alert">
    <div class="alert alert-dismissible fade show" :class="typeClass" role="alert">
      {{message}}
      <button v-if="dismissable === true" @click="$emit('clear-message')" type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      default: ''
    },
    type: {
      default: 'primary'
    },
    dismissable: {
      default: true
    }
  },
  computed: {
    typeClass () {
      return 'alert-' + this.type
    }
  }
}
</script>
