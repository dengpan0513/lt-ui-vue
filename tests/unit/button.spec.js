import { mount } from '@vue/test-utils'
import Button from '~/Button/Button.vue'

const factoryButton = propsData => {
  return mount(Button, {
    propsData,
    slots: {
      default: '按钮'
    }
  })
}

describe('Button', () => {
  let wrapper = null
  afterEach(() => {
    wrapper.destroy()
  })

  it('存在', () => {
    wrapper = factoryButton()
    expect(wrapper.exists()).toBe(true)
  })

  describe('props', () => {
    it('可以设置 type', () => {
      const typeList = ['secondary', 'primary', 'dashed', 'outline', 'text']
      typeList.forEach(type => {
        wrapper = factoryButton({
          type
        })
        expect(wrapper.classes()).toContain(`l-button-${type}`)
      })
    })

    it('可以设置 size', () => {
      const sizeList = ['large', 'medium', 'small', 'mini']
      sizeList.forEach(size => {
        wrapper = factoryButton({
          size
        })
        expect(wrapper.classes()).toContain(`l-button-${size}`)
      })
    })

    it('可以设置 htmlType', () => {
      const htmlTypeList = ['button', 'submit', 'reset']
      htmlTypeList.forEach(htmlType => {
        wrapper = factoryButton({
          htmlType
        })
        const { type } = wrapper.attributes()
        expect(type).toEqual(htmlType)
      })
    })

    it('未设置 icon prop 时 HTML 不会包含 Icon 组件', () => {
      wrapper = factoryButton()
      const icon = wrapper.find('.l-button-icon')
      expect(icon.exists()).toBe(false)
    })

    it('可以设置 icon', () => {
      wrapper = factoryButton({
        icon: 'search'
      })
      const { href } = wrapper.find('use').attributes()
      expect(href).toEqual('#icon-search')
    })

    it('可以设置 iconPosition', () => {
      wrapper = factoryButton({
        icon: 'plus',
        iconPosition: 'right'
      })
      expect(wrapper.classes()).toContain('l-button-icon-right')
    })

    it('可以设置 loading', () => {
      wrapper = factoryButton({
        loading: true
      })
      expect(wrapper.classes()).toContain('l-button-loading')
      const { href } = wrapper.find('use').attributes()
      expect(href).toEqual('#icon-loading')
    })

    it('可以设置 disabled', () => {
      wrapper = factoryButton({
        disabled: true
      })
      const { disabled } = wrapper.attributes()
      expect(disabled).toEqual('disabled')
    })

    it('可以设置 status', () => {
      const statusList = ['success', 'warning', 'danger']
      statusList.forEach(status => {
        wrapper = factoryButton({
          status
        })
        expect(wrapper.classes()).toContain(`l-button-${status}`)
      })
    })

    it('可以设置 shape', () => {
      const shapeList = ['square', 'circle', 'round']
      shapeList.forEach(shape => {
        wrapper = factoryButton({
          shape
        })
        expect(wrapper.classes()).toContain(`l-button-shape-${shape}`)
      })
    })

    it('可以设置 long', () => {
      wrapper = factoryButton({
        long: true
      })
      expect(wrapper.classes()).toContain('l-button-long')
    })
  })

  describe('events', () => {
    it('支持 click event', async () => {
      wrapper = factoryButton()
      const spy = jest.fn()
      wrapper.vm.$on('click', () => {
        spy()
      })
      await wrapper.trigger('click')
      expect(spy).toHaveBeenCalled()
    })

    it('设置 disabled 时无法 click', async () => {
      wrapper = factoryButton({
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
