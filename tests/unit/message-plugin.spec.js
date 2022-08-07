import { mount, createLocalVue } from '@vue/test-utils'
import messagePlugin from '~/Message/plugin.js'

const localVue = createLocalVue()
localVue.use(messagePlugin)

const factoryPlugin = handler => {
  return mount({
    name: 'MessageTest',
    template: '<button @click="showMessage">show message</button>',
    methods: {
      showMessage () {
        handler(this)
      }
    }
  }, {
    localVue
  })
}

describe('MessagePlugin', () => {
  let wrapper = null
  afterEach(() => {
    wrapper.destroy()
    document.body.querySelector('.l-message-wrapper').remove()
  })

  it('可以通过 vm.$message 的方式调用', async () => {
    const content = 'message plugin'
    const handleClick = vm => {
      vm.$message(content)
    }
    wrapper = factoryPlugin(handleClick)
    const button = wrapper.find('button')
    await button.trigger('click')
    const messageWrapper = document.body.querySelector('.l-message-wrapper')
    expect(messageWrapper).toBeTruthy()
  })

  const testArgs = async (isCompleteArg = true, isObjectArg = false) => {
    const content = 'message plugin'
    const spy = jest.fn()
    const time = Date.now()
    const onClose = () => {
      if (isCompleteArg) {
        const duration = parseInt((Date.now() - time) / 1000, 10)
        expect(duration).toEqual(2)
      }
      spy()
    }
    const handleClick = vm => {
      const duration = 2
      if (isObjectArg) {
        vm.$message({
          content,
          duration,
          onClose
        })
      } else if (!isCompleteArg) {
        vm.$message(content, onClose)
      } else {
        vm.$message(content, duration, onClose)
      }
    }
    wrapper = factoryPlugin(handleClick)
    const button = wrapper.find('button')
    await button.trigger('click')
    const { textContent } = document.body.querySelector('.l-message-wrapper')
    expect(textContent.trim()).toEqual(content)
    await new Promise(resolve => setTimeout(resolve, 1000))
    expect(spy).toHaveBeenCalled()
  }
  describe('参数可以是 (content, [duration], onClose)', () => {
    it('当参数是 3 个时', () => {
      testArgs()
    })

    it('当参数是 2 个时', () => {
      testArgs(false)
    })
  })

  it('参数还可以是对象形式', () => {
    testArgs(true, false)
  })

  describe('可以通过 vm.$message.[type] 的方式调用', () => {
    const testType = async type => {
      wrapper = factoryPlugin(function (vm) {
        vm.$message[type]('message', 0)
      })
      await wrapper.find('button').trigger('click')
      const icon = document.body.querySelector('.l-message-icon')
      if (type !== 'normal') {
        expect(icon).toBeTruthy()
        const useElement = document.body.querySelector('use').outerHTML
        const iconTypeMap = {
          info: 'info-fill',
          success: 'check-circle-fill',
          warning: 'warning-fill',
          error: 'close-circle-fill',
          loading: 'loading'
        }
        expect(useElement).toContain(iconTypeMap[type])
      } else {
        expect(icon).not.toBeTruthy()
      }
    }
    it('可以通过 vm.$message.normal 调用', () => {
      testType('normal')
    })
    it('可以通过 vm.$message.info 调用', () => {
      testType('info')
    })
    it('可以通过 vm.$message.success 调用', () => {
      testType('success')
    })
    it('可以通过 vm.$message.warning 调用', () => {
      testType('warning')
    })
    it('可以通过 vm.$message.error 调用', () => {
      testType('error')
    })
    it('可以通过 vm.$message.loading 调用', () => {
      testType('loading')
    })
  })
})
