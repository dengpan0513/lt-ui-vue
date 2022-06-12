import '../icons/index.js'
import '~/styles/reset.scss'
import Icon from '~/Icon/index.js'
import Button from '~/Button/index.js'
import ButtonGroup from '~/ButtonGroup/index.js'
import Link from '~/Link/index.js'
import Row from '~/Row/index.js'
import Col from '~/Col/index.js'
import Divider from '~/Divider/index.js'
import Layout from '~/Layout/index.js'
import Header from '~/Header/index.js'
import Sider from '~/Sider/index.js'
import Content from '~/Content/index.js'
import Footer from '~/Footer/index.js'

const components = [
  Icon,
  Button,
  ButtonGroup,
  Link,
  Row,
  Col,
  Divider,
  Layout,
  Header,
  Sider,
  Content,
  Footer
]

const install = Vue => {
  if (install.installed) {
    return
  }
  install.installed = true
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components
}
