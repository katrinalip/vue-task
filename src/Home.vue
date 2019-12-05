<template>
    <div id="app">
        <router-link class="link" to="/tasks-description">Tasks description</router-link>
        <router-link class="link" to="/task1">Task 1 (calculator)</router-link>
        <router-link class="link" to="/task2">Task 2 (websocket)</router-link>
        <router-link class="link" to="/qa">Q/A</router-link>
        <hr /> 
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
#app {
    font-family: 'Roboto', sans-serif;
}

.link {
    margin-right: 20px;
}
</style>