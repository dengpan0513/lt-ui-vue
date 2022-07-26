import Message from './Message.vue'
import { deleteUndefinedKeys } from '@/utils/index.js'

let count = 1
const gapVertical = 16
const messageInstances = []
const messageTypes = ['normal', 'info', 'success', 'warning', 'error', 'loading']

const generateProps = (content, duration, onClose, type) => {
  if (Object.prototype.toString.call(content) === '[object Object]') {
    return type ? { ...content, type } : content
  }
  const props = { content, duration, onClose, type }
  if (typeof duration === 'function') {
    props.onClose = duration
    props.duration = undefined
  }
  deleteUndefinedKeys(props)
  return props
}

const calculateMessageTop = message => {
  let top = message.top
  if (messageInstances.length > 0) {
    messageInstances.forEach(instance => {
      const { offsetHeight } = instance.$el
      top += offsetHeight + gapVertical
    })
  }
  return top
}

const listenMessageClose = currentInstance => {
  const { id, $el: { offsetHeight } } = currentInstance
  let index = -1
  let height = 0
  messageInstances.forEach((instance, i) => {
    if (instance.id === id) {
      index = i
      messageInstances.splice(i, 1)
      height = offsetHeight
    }
  })
  const count = messageInstances.length
  if ((count <= 1 && index !== 0) || (index > count - 1)) {
    return
  }
  for (let i = index; i < count; i++) {
    const rootElement = messageInstances[i].$el
    const { style: { top } } = rootElement
    const topValue = parseInt(top, 10)
    messageInstances[i].top = topValue - height - gapVertical
  }
}

const createMessage = (Vue, content, duration, onClose, type) => {
  const MessageConstructor = Vue.extend(Message)
  const propsData = generateProps(content, duration, onClose, type)
  const messageInstance = new MessageConstructor({
    propsData
  })
  messageInstance.id = `l-message-${count++}`
  messageInstance.$mount()
  document.body.appendChild(messageInstance.$el)
  messageInstance.$on('close', currentInstance => {
    listenMessageClose(currentInstance)
  })
  messageInstance.top = calculateMessageTop(messageInstance)
  messageInstances.push(messageInstance)
  return messageInstance
}

export default {
  install (Vue) {
    Vue.prototype.$message = (content, duration, onClose) => { createMessage(Vue, content, duration, onClose) }
    messageTypes.forEach(type => {
      Vue.prototype.$message[type] = (content, duration, onClose) => { createMessage(Vue, content, duration, onClose, type) }
    })
  }
}
