<template>
<div id="checkbox-box" class="card border" :class="{'border-danger': v.$error}">
  <div class="form-row">
    <div class="form-group" :class=[componentSize] v-for="(item, key, index) in itemsListValues">
      <input
          class="form-check-input"
          type="checkbox"
          :value="key"
          :id="'gridCheck' + index"
          @change="updateItems();v.$touch();"
          v-model="itemsInputs">
      <label class="form-check-label" :for="'gridCheck' + index">
      {{ item }}
      </label>
    </div>
  </div>
  <p v-if="!v.required">Please select some items.</p>
  <p class="text-danger" v-if="!v.maxLen">- You can select only {{ maxItems }} items.</p>
</div>
</template>

<script>
export default {
  name: 'BootstrapCheckboxBoard',

  props: ['itemsList', 'maxItems', 'componentSize', 'v'],

  data: function () {
    return {
      itemsInputs: [],
      itemsListValues: this.itemsList

    }
  },

  methods: {
    updateItems () {
      this.$emit('updatedBoxes', this.itemsInputs)
    }
  }
}
</script>

<style scoped>
#checkbox-box {
  padding: 20px
}
</style>
