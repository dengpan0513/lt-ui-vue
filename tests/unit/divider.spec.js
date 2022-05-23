import { mount } from '@vue/test-utils'
import LDivider from '~/Divider/Divider.vue'

const factoryDivider = (propsData, defaultSlot = '') => {
  return mount(LDivider, {
    propsData: {
      ...propsData
    },
    slots: {
      default: defaultSlot
    }
  })
}

describe('Divider', () => {
  let wrapper = null
  afterEach(() => {
    wrapper.destroy()
  })

  it('存在', () => {
    wrapper = factoryDivider()
    expect(wrapper.exists()).toBe(true)
  })

  describe('props', () => {
    it('可以设置 type', () => {
      const typeList = ['solid', 'dashed', 'dotted', 'double']
      typeList.forEach(type => {
        wrapper = factoryDivider({
          type
        })
        const { borderBottomStyle } = getComputedStyle(wrapper.vm.$el)
        expect(borderBottomStyle).toEqual(type)
      })
    })

    it('可以设置 color', () => {
      wrapper = factoryDivider({
        color: '#eee'
      })
      const { borderBottomColor } = getComputedStyle(wrapper.vm.$el)
      expect(borderBottomColor).toEqual('#eee')
    })

    describe('可以设置 gap', () => {
      it('gap 可以是 Number', () => {
        wrapper = factoryDivider({
          gap: 24
        })
        const { marginTop, marginBottom } = getComputedStyle(wrapper.vm.$el)
        expect(marginTop).toEqual('24px')
        expect(marginBottom).toEqual('24px')
      })

      it('gap 可以是 String', () => {
        wrapper = factoryDivider({
          gap: '16px'
        })
        const { marginTop, marginBottom } = getComputedStyle(wrapper.vm.$el)
        expect(marginTop).toEqual('16px')
        expect(marginBottom).toEqual('16px')
      })
    })

    describe('可以设置 direction', () => {
      it('direction 默认值是 horizontal', () => {
        wrapper = factoryDivider()
        expect(wrapper.classes()).toContain('l-divider-horizontal')
      })

      it('在 horizontal 模式下可以设置内容', () => {
        wrapper = factoryDivider(null, '滕王阁序')
        expect(wrapper.find('.l-divider-text').exists()).toBe(true)
        const spanElement = wrapper.vm.$el.querySelector('.l-divider-text')
        expect(spanElement.textContent).toEqual('滕王阁序')
      })

      it('direction 可以是 vertical', () => {
        wrapper = factoryDivider({
          direction: 'vertical'
        })
        expect(wrapper.classes()).toContain('l-divider-vertical')
      })

      it('vertical 模式下 type 和 color 对应的是 borderLeft', () => {
        wrapper = factoryDivider({
          direction: 'vertical',
          type: 'dashed',
          color: '#aaa'
        })
        const { borderLeftStyle, borderLeftColor } = getComputedStyle(wrapper.vm.$el)
        expect(borderLeftStyle).toEqual('dashed')
        expect(borderLeftColor).toEqual('#aaa')
      })

      it('vertical 模式下无法设置内容', () => {
        wrapper = factoryDivider({
          direction: 'vertical'
        }, '滕王阁序')
        expect(wrapper.find('.l-divider-text').exists()).toBe(false)
      })
    })

    it('在 horizontal 模式下可以设置 textPosition', () => {
      const textPositionList = ['left', 'center', 'right']
      textPositionList.forEach(position => {
        wrapper = factoryDivider({
          textPosition: position
        }, '滕王阁序')
        expect(wrapper.find('.l-divider-text').classes()).toContain(`l-divider-text-${position}`)
      })
    })
  })
})
