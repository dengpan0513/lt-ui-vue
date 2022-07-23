import Message from './Message.vue'
import { deleteUndefinedKeys } from '@/utils/index.js'

const generateProps = (content, duration, onClose) => {
  if (Object.prototype.toString.call(content) === '[object Object]') {
    return { ...content }
  }
  const props = { content, duration, onClose }
  if (typeof duration === 'function') {
    props.onClose = duration
    props.duration = undefined
  }
  deleteUndefinedKeys(props)
  return props
}

export default {
  install (Vue) {
    Vue.prototype.$message = (content, duration, onClose) => {
      const MessageConstructor = Vue.extend(Message)
      const propsData = generateProps(content, duration, onClose)
      console.log(propsData)
      const MessageInstance = new MessageConstructor({
        propsData
      })
      MessageInstance.$mount()
      document.body.appendChild(MessageInstance.$el)
    }
  }
}
