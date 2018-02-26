import Vue from 'vue'
import HeaderAdmin from '@/components/header/HeaderAdmin'
import router from '@/router'

describe('HeaderAdmin.vue', () => {
  let vm

  beforeEach(function () {
    const Constructor = Vue.extend(HeaderAdmin)
    vm = new Constructor({router}).$mount()
  })

  it('should render correct contents', () => {
    expect(vm.$el.querySelector('#initial-logo').src)
      .to.contain('img/shuffle_white')
  })

  it('should have the correct logo link to home', () => {
    expect(vm.$el.querySelector('.logo a').href)
      .to.match(/^[\w\W]+\/$/)
  })

  it('should have a nav with 5 links and a button', () => {
    expect(vm.$el.querySelectorAll('nav a').length)
      .to.equal(5)
    expect(vm.$el.querySelectorAll('nav button').length)
      .to.equal(1)
  })
})
