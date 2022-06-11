import { mount } from '@vue/test-utils'
import LLayout from '~/Layout/Layout.vue'
import LHeader from '~/Header/Header.vue'
import LSider from '~/Sider/Sider.vue'
import LContent from '~/Content/Content.vue'
import LFooter from '~/Footer/Footer.vue'

const factoryLayout = defaultSlot => {
  return mount(LLayout, {
    components: {
      LLayout,
      LHeader,
      LSider,
      LContent,
      LFooter
    },
    slots: {
      default: [defaultSlot]
    }
  })
}

describe('Layout', () => {
  let wrapper = null
  afterEach(() => {
    wrapper.destroy()
  })

  it('存在', () => {
    const defaultSlot = `
      <l-header>header</l-header>
      <l-content>content</l-content>
      <l-footer>header</l-footer>
      `
    wrapper = factoryLayout(defaultSlot)
    expect(wrapper.exists()).toBe(true)
  })

  it('当包含 LSider 组件时，Layout 会有 l-layout-has-sider 的类', async () => {
    const defaultSlot = `
      <l-sider>sider</l-sider>
      <l-content>content</l-content>
    `
    wrapper = factoryLayout(defaultSlot)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.l-layout').classes()).toContain('l-layout-has-sider')
  })
})
