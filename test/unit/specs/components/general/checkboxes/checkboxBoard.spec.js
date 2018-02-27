import Vue from 'vue'
import CheckboxBoard from '@/components/general/checkboxes/checkboxBoard'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

describe('checkboxBoard.vue', () => {
  let vm

  beforeEach(function () {
    const Constructor = Vue.extend(CheckboxBoard)
    vm = new Constructor({
      props: {
        itemsList: ['a','b'],
        maxItems: 3,
        componentSize: 'col-md-6'
      }
    }).$mount()
  })

  it('should render correct contents', () => {
    // Pending
  })
})
