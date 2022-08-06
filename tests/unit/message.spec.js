import { mount } from '@vue/test-utils'
import Message from '~/Message/Message.vue'

const factoryMessage = propsData => {
  return mount(Message, {
    propsData,
    stubs: {
      transition: true
    }
  })
}

describe('Message', () => {
  let wrapper = null
  afterEach(() => {
    wrapper.destroy()
  })

  it('存在', () => {
    wrapper = factoryMessage()
    expect(wrapper.exists()).toBe(true)
  })

  describe('props', () => {
    it('可以设置 content', () => {
      const content = 'Message Component'
      wrapper = factoryMessage({
        content
      })
      const messageContent = wrapper.find('.l-message-content').text()
      expect(messageContent).toEqual(content)
    })

    it('可以通过启用 dangerouslyUseHTML 的方式添加 HTML', () => {
      wrapper = factoryMessage({
        content: '<strong>HTML Content</strong>',
        dangerouslyUseHTML: true
      })
      const strongElement = wrapper.find('strong')
      expect(strongElement.exists()).toBe(true)
      expect(strongElement.text()).toEqual('HTML Content')
    })

    it('可以设置 duration 改变自动关闭时间', done => {
      const duration = 2
      wrapper = factoryMessage({
        duration
      })
      wrapper.vm.visible = true
      setTimeout(() => {
        expect(wrapper.vm.visible).toBe(false)
        expect(wrapper.emitted('close')).toBeTruthy()
        done()
      }, duration * 1000)
    })

    it('可以设置不同的 type', () => {
      const typeList = ['normal', 'info', 'success', 'warning', 'error', 'loading']
      typeList.forEach(type => {
        wrapper = factoryMessage({
          type
        })
        expect(wrapper.find('.l-message').classes()).toContain(`l-message-${type}`)
        if (type !== 'normal') {
          const { href } = wrapper.find('use').attributes()
          const iconTypeMap = {
            info: 'info-fill',
            success: 'check-circle-fill',
            warning: 'warning-fill',
            error: 'close-circle-fill',
            loading: 'loading'
          }
          expect(href).toEqual(`#icon-${iconTypeMap[type]}`)
        }
      })
    })

    it('可以设置 top', () => {
      wrapper = factoryMessage({
        top: 100
      })
      const { style } = wrapper.find('.l-message-wrapper').attributes()
      expect(style).toContain('top: 100px')
    })

    it('可以设置 icon，并且 icon 会覆盖 type 对应的图标', () => {
      const icon = 'plus'
      wrapper = factoryMessage({
        type: 'success',
        icon
      })
      const { href } = wrapper.find('use').attributes()
      expect(href).toEqual(`#icon-${icon}`)
    })

    it('可以设置 closeable', () => {
      wrapper = factoryMessage({
        closeable: true
      })
      expect(wrapper.find('.l-message-close').exists()).toBe(true)
    })

    it('可以设置 onClose', async () => {
      const spy = jest.fn()
      wrapper = factoryMessage({
        closeable: true,
        onClose () {
          spy()
        }
      })
      await wrapper.find('.l-message-close').trigger('click')
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('event', () => {
    it('支持 close event', async () => {
      const spy = jest.fn()
      wrapper = factoryMessage({
        closeable: true
      })
      wrapper.vm.$on('close', () => {
        spy()
      })
      await wrapper.find('.l-message-close').trigger('click')
      expect(spy).toHaveBeenCalled()
    })
  })
})
