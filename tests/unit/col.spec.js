import { mount } from '@vue/test-utils'
import Col from '~/Col/Col.vue'

const factoryCol = propsData => {
  return mount(Col, {
    propsData: {
      ...propsData
    }
  })
}

describe('Col', () => {
  let wrapper = null
  afterEach(() => {
    wrapper.destroy()
  })

  it('存在', () => {
    wrapper = factoryCol()
    expect(wrapper.exists()).toBe(true)
  })

  describe('props', () => {
    it('可以设置 span', () => {
      wrapper = factoryCol({
        span: 12
      })
      expect(wrapper.classes()).toContain('l-col-12')
    })

    it('可以设置 offset', () => {
      wrapper = factoryCol({
        offset: 3
      })
      expect(wrapper.classes()).toContain('l-col-offset-3')
    })

    it('可以设置 push', () => {
      wrapper = factoryCol({
        push: 4
      })
      expect(wrapper.classes()).toContain('l-col-push-4')
    })

    it('可以设置 pull', () => {
      wrapper = factoryCol({
        pull: 2
      })
      expect(wrapper.classes()).toContain('l-col-pull-2')
    })

    it('可以设置 order', () => {
      wrapper = factoryCol({
        order: 1
      })
      expect(wrapper.classes()).toContain('l-col-order-1')
    })

    describe('可以设置响应式属性', () => {
      const responsiveProps = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
      responsiveProps.forEach(item => {
        it(`${item} 类型是 Number 时`, () => {
          wrapper = factoryCol({
            [item]: 6
          })
          expect(wrapper.classes()).toContain(`l-col-${item}-6`)
        })

        it(`${item} 类型是 Object 时`, () => {
          wrapper = factoryCol({
            [item]: {
              span: 4, offset: 2, push: 3, pull: 5, order: 1
            }
          })
          expect(wrapper.classes()).toContain(`l-col-${item}-4`)
          expect(wrapper.classes()).toContain(`l-col-offset-${item}-2`)
          expect(wrapper.classes()).toContain(`l-col-push-${item}-3`)
          expect(wrapper.classes()).toContain(`l-col-pull-${item}-5`)
          expect(wrapper.classes()).toContain(`l-col-order-${item}-1`)
        })
      })
    })
  })
})
