<template>
  <div class="chat">
    <div class="messages">
      <div v-for="m in chat.messages" :key="m.text" class="msg">
        <b>{{ m.role }}:</b> {{ m.text }}
      </div>
    </div>

    <div class="input">
      <input
        v-model="input"
        placeholder="покажи автобусы / фильтр / график"
        @keyup.enter="send"
      />
      <button @click="send">Отправить</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useChatStore } from '../stores/chatStore'

const chat = useChatStore()
const input = ref('')

const send = () => {
  if (!input.value) return
  chat.handleUserRequest(input.value)
  input.value = ''
}
</script>

<style>
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages {
  flex: 1;
  overflow: auto;
  font-size: 13px;
}

.msg {
  margin-bottom: 6px;
}

.input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #2563eb;
  color: white;
}
</style>