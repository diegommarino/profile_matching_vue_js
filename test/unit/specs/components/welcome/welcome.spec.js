import Vue from 'vue'
import Welcome from '@/components/welcome/Welcome'

describe('Welcome.vue', () => {
  let vm

  beforeEach(function () {
    const Constructor = Vue.extend(Welcome)
    vm = new Constructor().$mount()
  })

  it('should render correct contents', () => {
    expect(vm.$el.querySelector('#welcome h1').textContent)
      .to.equal('Welcome to Profile Matching')
    expect(vm.$el.querySelector('#welcome p').textContent)
      .to.equal('Just check if your interests matches with another person interests.')
    expect(vm.$el.querySelectorAll('.cta a')[0].textContent)
      .to.equal('Sign Up')
    expect(vm.$el.querySelectorAll('.cta a')[1].textContent)
      .to.equal('Sign In')
  })
})
