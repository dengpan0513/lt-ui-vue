import { mount } from '@vue/test-utils'
import Space from '~/Space/Space.vue'

const factorySpace = (propsData, splitSlot = '') => {
  return mount(Space, {
    propsData,
    slots: {
      default: [
        '<div>HTML</div>',
        '<div>CSS</div>',
        '<div>JavaScript</div>',
        '<div>Vue</div>'
      ],
      split: [splitSlot]
    }
  })
}

describe('Space', () => {
  let wrapper = null
  afterEach(() => {
    wrapper.destroy()
  })
  it('存在', () => {
    wrapper = factorySpace()
    expect(wrapper.exists()).toBe(true)
  })

  describe('props', () => {
    it('可以设置 direction', () => {
      const directionList = ['horizontal', 'vertical']
      directionList.forEach(direction => {
        wrapper = factorySpace({
          direction
        })
        expect(wrapper.classes()).toContain(`l-space-${direction}`)
      })
    })

    describe('可以设置 size', () => {
      it('size 可以是 Number', () => {
        wrapper = factorySpace({
          size: 32
        })
        const { style } = wrapper.attributes()
        expect(style).toContain('gap: 32px;')
      })

      it('size 可以是 String', () => {
        const sizeList = ['mini', 'small', 'medium', 'large']
        sizeList.forEach(size => {
          wrapper = factorySpace({
            size
          })
          expect(wrapper.classes()).toContain(`l-space-size-${size}`)
        })
      })

      it('size 可以是 Array', () => {
        wrapper = factorySpace({
          size: [30, 20]
        })
        const { style } = wrapper.attributes()
        expect(style).toContain('gap: 20px 30px;')
      })
    })
  })

  describe('可以设置 wrap', () => {
    it('wrap 仅在 direction: horizontal 时有效', () => {
      wrapper = factorySpace({
        wrap: true
      })
      expect(wrapper.classes()).toContain('l-space-wrap')
    })

    it('wrap 在 direction: vertical 时无效', () => {
      wrapper = factorySpace({
        direction: 'vertical',
        wrap: true
      })
      expect(wrapper.classes()).not.toContain('l-space-wrap')
    })
  })

  it('可以设置 align', () => {
    const alignList = ['start', 'end', 'center', 'baseline']
    alignList.forEach(align => {
      wrapper = factorySpace({
        align
      })
      expect(wrapper.classes()).toContain(`l-space-align-${align}`)
    })
  })

  it('可以设置 fill', () => {
    wrapper = factorySpace({
      fill: true
    })
    expect(wrapper.classes()).toContain('l-space-fill')
  })

  describe('可以设置分隔符', () => {
    it('通过 prop split 设置默认分隔符', () => {
      wrapper = factorySpace({
        split: true
      })
      const splitDefault = wrapper.find('.l-divider-vertical')
      expect(splitDefault.exists()).toBe(true)
      const lengthSlotsDefault = wrapper.vm.$slots.default.length
      const lengthSplitItem = wrapper.findAll('.l-space-item-split').length
      expect(lengthSlotsDefault - lengthSplitItem).toEqual(1)
    })

    it('通过 slot split 设置自定义分隔符', () => {
      const splitSlot = '<div>~</div>'
      wrapper = factorySpace({}, splitSlot)
      const splitItems = wrapper.findAll('.l-space-item-split')
      splitItems.wrappers.forEach(splitItem => {
        expect(splitItem.html()).toContain(splitSlot)
      })
    })
  })
})
