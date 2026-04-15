import { defineStore } from 'pinia'
import { analyzeTransportMessage } from '../services/transportAnalystAgent'
import { useUiStore } from './uiStore'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: []
  }),

  actions: {
    handleUserRequest(text) {
      const ui = useUiStore()

      this.messages.push({ role: 'user', text })

      const result = analyzeTransportMessage(text)

      if (result.command) {
        ui.applyCommand(result.command)
      }

      this.messages.push({
        role: 'ai',
        text: result.response
      })
    }
  }
})