import { mount } from '@vue/test-utils'
import LLink from '~/Link/Link.vue'

const factoryLink = (propsData) => {
  return mount(LLink, {
    propsData: {
      ...propsData
    },
    slots: {
      default: '链接'
    }
  })
}

describe('Link', () => {
  let wrapper = null
  afterEach(() => {
    wrapper.destroy()
  })

  it('存在', () => {
    wrapper = factoryLink()
    expect(wrapper.exists()).toBe(true)
  })

  describe('props', () => {
    it('可以设置 href', () => {
      wrapper = factoryLink({
        href: 'www.test.com'
      })
      const { href } = wrapper.attributes()
      expect(href).toEqual('www.test.com')
    })

    it('可以设置 target', () => {
      const targetList = ['_self', '_blank', '_parent', '_top']
      targetList.forEach(target => {
        wrapper = factoryLink({
          target
        })
        const { target: targetValue } = wrapper.attributes()
        expect(targetValue).toEqual(target)
      })
    })

    it('可以设置 underline', () => {
      wrapper = factoryLink({
        underline: true
      })
      expect(wrapper.classes()).toContain('l-link-underline')
    })

    it('可以设置 status', () => {
      const statusList = ['success', 'warning', 'error']
      statusList.forEach(status => {
        wrapper = factoryLink({
          status
        })
        expect(wrapper.classes()).toContain(`l-link-${status}`)
      })
    })

    it('可以设置 icon', () => {
      wrapper = factoryLink({
        icon: 'star'
      })
      const { href } = wrapper.find('use').attributes()
      expect(href).toEqual('#icon-star')
    })

    it('未设置 icon prop 时 HTML 不会包含 Icon 组件', () => {
      wrapper = factoryLink()
      const icon = wrapper.find('.l-link-icon')
      expect(icon.exists()).toBe(false)
    })

    it('可以设置 isHover', () => {
      wrapper = factoryLink({
        isHover: false
      })
      expect(wrapper.classes()).toContain('l-link-no-hover')
    })

    it('可以设置 disabled', () => {
      wrapper = factoryLink({
        disabled: true
      })
      expect(wrapper.classes()).toContain('l-link-disabled')
      const { tabindex } = wrapper.attributes()
      expect(parseInt(tabindex, 10)).toEqual(-1)
    })
  })

  describe('events', () => {
    it('支持 click event', async () => {
      wrapper = factoryLink()
      const spy = jest.fn()
      wrapper.vm.$on('click', () => {
        spy()
      })
      await wrapper.trigger('click')
      expect(spy).toHaveBeenCalled()
    })

    it('设置 disabled 时无法触发 click event', async () => {
      wrapper = factoryLink({
        disabled: true
      })
      const spy = jest.fn()
      wrapper.vm.$on('click', () => {
        spy()
      })
      await wrapper.trigger('click')
      expect(spy).not.toHaveBeenCalled()
    })
  })
})
