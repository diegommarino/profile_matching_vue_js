import Vue from 'vue'
import router from '@/router'
import ProfileForm from '@/components/profile/profileForm'
import CheckboxBoard from '@/components/general/checkboxes/checkboxBoard'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

describe('profileForm.vue', () => {
  let vm

  beforeEach(function () {
    const Constructor = Vue.extend(ProfileForm)
    vm = new Constructor({router}).$mount()
  })

  it('should load validations', () => {
    expect(vm.$v).to.exist
  })

  it('should render correct contents', () => {
    // Pending
  })
})
