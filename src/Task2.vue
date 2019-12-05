<template>
  <div>
    <h2>Task 2 (Websocket)</h2>

    <div>Comments:</div>
    <ul>
      <li v-for="comment in notRemovedComments" v-bind:key="comment.uuid">
        <span>{{ comment.text }}</span>
        <span class="btn-remove" v-on:click="removeComment(comment.uuid)">(удалить)</span>
      </li>
    </ul>
    <input v-model="userInput" />
    <button v-on:click="addComment()">Add</button>
  </div>
</template>

<script>
const socket = new WebSocket('ws://echo.websocket.org')

export default {
  data() {
    return {
      comments: [
        { uuid: this.uuidv4(), text: 'Тестовый коммент 1', removed: false },
        { uuid: this.uuidv4(), text: 'Это шедевр', removed: false },
        { uuid: this.uuidv4(), text: 'Это прекрасно', removed: false },
        { uuid: this.uuidv4(), text: 'Лучшее, что я видел', removed: false },
        { uuid: this.uuidv4(), text: 'Два чая этому автору', removed: false }
      ],
      lastRequestId: 0,
      operationsPull: [],
      userInput: null
    }
  },
  computed: {
    notRemovedComments() {
      return this.comments.filter(comment => !comment.removed)
    }
  },
  methods: {
    addComment() {
      const input = this.userInput
      this.makeRequest(() => {
        this.comments.push({
          uuid: this.uuidv4(),
          text: input, 
          removed: false
        })
      })
      this.userInput = '' 
    },
    removeComment(uuid) {
      this.makeRequest(() => {
        this.comments.find(comment => comment.uuid === uuid).removed = true
      })
    },
    makeRequest(onResponse) {
      const requestId = this.lastRequestId + 1

      socket.send(requestId)
      this.operationsPull.push({ 
        requestId, 
        operation: onResponse
      })

      this.lastRequestId = requestId
    },
    uuidv4() {
        // Source: https://stackoverflow.com/a/2117523

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
  },
  mounted() {
    socket.addEventListener('message', (event) => { 
      const responseForRequest = parseInt(event.data)
      
      const operation = this.operationsPull.find(op => op.requestId === responseForRequest)
      operation.operation()
      // delete operation // eslint-disable-line
    });
  }
}
</script>

<style>
.btn-remove {
  cursor: pointer;
  margin-left: 5px;
}
</style>
