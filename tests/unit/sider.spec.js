import { mount } from '@vue/test-utils'
import Sider from '~/Sider/Sider.vue'
import Layout from '~/Layout/Layout.vue'
import Content from '~/Content/Content.vue'

const factorySider = propsData => {
  return mount(Sider, {
    propsData,
    slots: {
      default: 'sider'
    }
  })
}

describe('Sider', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: parseInt(window.innerWidth) > parseInt(query?.slice(12, 15)),
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  })
  let wrapper = null
  afterEach(() => {
    wrapper.destroy()
  })

  it('存在', () => {
    wrapper = factorySider()
    expect(wrapper.exists()).toBe(true)
  })

  describe('props', () => {
    it('可以设置 width', () => {
      wrapper = factorySider({
        width: 240
      })
      expect(wrapper.attributes('style')).toContain('width: 240px')
    })

    it('可以设置 theme', () => {
      wrapper = factorySider({
        theme: 'dark'
      })
      expect(wrapper.classes()).toContain('l-layout-sider-dark')
    })

    describe('可以设置 collapsible', () => {
      it('Sider 会包含类名 l-layout-sider-can-collapse', () => {
        wrapper = factorySider({
          collapsible: true
        })
        expect(wrapper.classes()).toContain('l-layout-sider-can-collapse')
      })
      it('会出现 collapseTrigger，并且点击后 Sider 可以收起', async () => {
        wrapper = factorySider({
          collapsible: true
        })
        const collapseTrigger = wrapper.find('.l-layout-sider-trigger')
        expect(collapseTrigger.exists()).toBe(true)
        await collapseTrigger.trigger('click')
        expect(wrapper.attributes('style')).toContain('width: 48px')
      })
    })

    it('可以设置 hideTrigger', () => {
      wrapper = factorySider({
        collapsible: true,
        hideTrigger: true
      })
      expect(wrapper.classes()).not.toContain('l-layout-sider-can-collapse')
      const collapseTrigger = wrapper.find('.l-layout-sider-trigger')
      expect(collapseTrigger.exists()).toBe(false)
    })

    it('可以设置 collapsed', async () => {
      wrapper = mount({
        components: { 'l-sider': Sider },
        template: '<l-sider v-model="collapsed" collapsible>sider</l-sider>',
        data () {
          return {
            collapsed: true
          }
        }
      })
      expect(wrapper.attributes('style')).toContain('width: 48px')
      const collapseTrigger = wrapper.find('.l-layout-sider-trigger')
      await collapseTrigger.trigger('click')
      expect(wrapper.attributes('style')).toContain('width: 200px')
      expect(wrapper.vm.collapsed).toBe(false)
      wrapper.vm.collapsed = true
      await wrapper.vm.$nextTick()
      expect(wrapper.attributes('style')).toContain('width: 48px')
    })

    it('可以设置 defaultCollapsed', () => {
      wrapper = factorySider({
        collapsible: true,
        defaultCollapsed: true
      })
      expect(wrapper.attributes('style')).toContain('width: 48px')
    })

    it('同时设置 collapsed 和 defaultCollapsed 时，Sider 收起/展开由 collapsed 决定', () => {
      wrapper = factorySider({
        collapsible: true,
        collapsed: false,
        defaultCollapsed: true
      })
      expect(wrapper.attributes('style')).toContain('width: 200px')
    })

    it('可以设置 collapsedWidth', () => {
      wrapper = factorySider({
        collapsible: true,
        defaultCollapsed: true,
        collapsedWidth: 24
      })
      expect(wrapper.attributes('style')).toContain('width: 24px')
    })

    it('可以设置 reverseArrow', () => {
      wrapper = mount({
        components: { 'l-layout': Layout, 'l-sider': Sider, 'l-content': Content },
        template: `
          <l-layout>
            <l-content>content</l-content>
            <l-sider v-model="collapsed" collapsible reverse-arrow>sider</l-sider>
          </l-layout>
        `,
        data () {
          return {
            collapsed: false
          }
        }
      })
      const { href } = wrapper.find('use').attributes()
      expect(href).toEqual('#icon-right')
    })

    it('可以设置 breakpoint', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 600
      })
      wrapper = mount({
        components: { 'l-layout': Layout, 'l-sider': Sider, 'l-content': Content },
        template: `
          <l-layout>
            <l-sider collapsible breakpoint="md">sider</l-sider>
            <l-content>content</l-content>
          </l-layout>
        `
      })
      await wrapper.vm.$nextTick()
      const sider = wrapper.find('.l-layout-sider')
      expect(sider.attributes('style')).toContain('width: 48px')
    })
  })

  describe('events', () => {
    describe('支持 collapse event', () => {
      it('可以通过点击 trigger 触发', async () => {
        const spy = jest.fn()
        let status
        let triggerType
        wrapper = factorySider({
          collapsible: true
        })
        wrapper.vm.$on('collapse', (collapsed, type) => {
          status = collapsed
          triggerType = type
          spy()
        })
        const collapseTrigger = wrapper.find('.l-layout-sider-trigger')
        await collapseTrigger.trigger('click')
        expect(status).toBe(true)
        expect(triggerType).toEqual('clickTrigger')
        expect(spy).toHaveBeenCalled()
      })

      it('可以通过响应式断点触发', async () => {
        const spy = jest.fn()
        let status
        let triggerType
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 600
        })
        wrapper = mount({
          components: { 'l-layout': Layout, 'l-sider': Sider, 'l-content': Content },
          template: `
            <l-layout>
              <l-sider collapsible breakpoint="md" @collapse="handleBreakPoint">sider</l-sider>
              <l-content>content</l-content>
            </l-layout>
          `,
          methods: {
            handleBreakPoint (collapsed, type) {
              status = collapsed
              triggerType = type
              spy()
            }
          }
        })
        await wrapper.vm.$nextTick()
        expect(status).toBe(true)
        expect(triggerType).toEqual('responsiveTrigger')
        expect(spy).toHaveBeenCalled()
      })
    })

    it('支持 breakpoint event', async () => {
      const spy = jest.fn()
      let status
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 600
      })
      wrapper = mount({
        components: { 'l-layout': Layout, 'l-sider': Sider, 'l-content': Content },
        template: `
            <l-layout>
              <l-sider collapsible breakpoint="lg" @breakpoint="handleBreakPoint">sider</l-sider>
              <l-content>content</l-content>
            </l-layout>
          `,
        methods: {
          handleBreakPoint (collapsed) {
            status = collapsed
            spy()
          }
        }
      })
      await wrapper.vm.$nextTick()
      expect(status).toBe(true)
      expect(spy).toHaveBeenCalled()
    })
  })
})
