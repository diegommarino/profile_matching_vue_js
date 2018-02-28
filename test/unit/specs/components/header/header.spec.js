import Vue from 'vue'
import Header from '@/components/header/Header'
import router from '@/router'

describe('Header.vue', () => {
  let vm

  beforeEach(function () {
    const Constructor = Vue.extend(Header)
    vm = new Constructor({router}).$mount()
  })

  it('should render correct contents', () => {
    expect(vm.$el.querySelector('#nav-logo').src)
      .to.contain('img/shuffle_white')
  })

  it('should have the correct logo link to home', () => {
    expect(vm.$el.querySelector('.logo a').href)
      .to.match(/^[\w\W]+\/$/)
  })

  it('should have a nav with 3 links and a button', () => {
    expect(vm.$el.querySelectorAll('nav a').length)
      .to.equal(4)
    expect(vm.$el.querySelectorAll('nav button').length)
      .to.equal(1)
  })
})
