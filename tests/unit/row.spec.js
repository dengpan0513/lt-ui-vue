import { mount } from '@vue/test-utils'
import Row from '~/Row/Row.vue'
import Col from '~/Col/Col.vue'

const factoryRow = propsData => {
  return mount(Row, {
    propsData,
    stubs: {
      'l-col': Col
    },
    slots: {
      default: [
        '<l-col :span="12">111</l-col>',
        '<l-col :span="12">222</l-col>'
      ]
    }
  })
}

describe('Row', () => {
  let wrapper = null
  afterEach(() => {
    wrapper.destroy()
  })

  it('存在', () => {
    wrapper = factoryRow()
    expect(wrapper.exists()).toBe(true)
  })

  describe('props', () => {
    it('可以设置 gutter', () => {
      wrapper = factoryRow({
        gutter: 24
      })
      const { marginRight, marginLeft } = getComputedStyle(wrapper.vm.$el)
      expect(marginRight).toEqual('-12px')
      expect(marginLeft).toEqual('-12px')
      const colList = wrapper.vm.$el.querySelectorAll('.l-col')
      colList.forEach(col => {
        const { paddingRight, paddingLeft } = getComputedStyle(col)
        expect(paddingRight).toEqual('12px')
        expect(paddingLeft).toEqual('12px')
      })
    })

    it('可以设置 justify', () => {
      const horizontalList = ['start', 'end', 'center', 'space-between', 'space-around', 'space-evenly']
      horizontalList.forEach(justify => {
        wrapper = factoryRow({
          justify
        })
        expect(wrapper.classes()).toContain(`l-row-${justify}`)
      })
    })

    it('可以设置 align', () => {
      const verticalList = ['top', 'middle', 'bottom']
      verticalList.forEach(align => {
        wrapper = factoryRow({
          align
        })
        expect(wrapper.classes()).toContain(`l-row-${align}`)
      })
    })
  })
})
