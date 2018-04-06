export const currentProfileMixin = {
  data () {
    return {
      profileData: this.$store.getters.user
    }
  },
  computed: {
    fullName () {
      return this.profileData.first_name + ' ' + this.profileData.last_name
    }
  },
  created () {
    if (!this.profileData.avatar) {
      this.profileData.avatar = require('@/assets/mystery_man.png')
    }
  }
}
