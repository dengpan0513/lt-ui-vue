import Message from './Message.vue'

Message.install = Vue => {
  Vue.component(Message.name, Message)
}

export default Message
