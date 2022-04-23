import { shallowMount } from '@vue/test-utils'
import LIcon from '~/Icon/Icon.vue'

const factoryIcon = (propsData) => {
  return shallowMount(LIcon, {
    propsData: { ...propsData }
  })
}

describe('Icon', () => {
  let wrapper = null
  afterEach(() => {
    wrapper.destroy()
  })

  it('存在', () => {
    wrapper = factoryIcon()
    expect(wrapper.exists()).toBe(true)
  })

  describe('props', () => {
    it('可以设置 name', () => {
      wrapper = factoryIcon({
        name: 'search'
      })
      const { href } = wrapper.find('use').attributes()
      expect(href).toEqual('#icon-search')
    })

    it('可以设置 color', () => {
      wrapper = factoryIcon({
        name: 'search',
        color: 'red'
      })
      const { style } = wrapper.attributes()
      expect(style).toMatch('fill: red')
    })

    it('可以设置 size', () => {
      wrapper = factoryIcon({
        name: 'search',
        size: 36
      })
      const { style } = wrapper.attributes()
      expect(style).toMatch('font-size: 36px')
    })

    it('可以设置 spin', () => {
      wrapper = factoryIcon({
        name: 'search',
        spin: true
      })
      expect(wrapper.classes()).toContain('l-icon-spin')
    })
  })

  describe('events', () => {
    it('支持 click', async () => {
      wrapper = factoryIcon({
        name: 'search'
      })
      const spy = jest.fn()
      wrapper.vm.$on('click', () => {
        spy()
      })
      await wrapper.trigger('click')
      expect(spy).toHaveBeenCalled()
    })
  })
})
