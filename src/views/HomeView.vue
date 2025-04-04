<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const quoteId = ref('');

function searchQuote() {
  if (quoteId.value) {
    router.push(`/quote/${quoteId.value}`);
  }
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/quotes">Todas las Citas</RouterLink>
      <RouterLink to="/random">Cita Aleatoria</RouterLink>
      <div>
        <input
          type="number"
          v-model="quoteId"
          placeholder="Buscar por ID"
          min="1"
        />
        <button @click="searchQuote">Buscar</button>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  gap: 10px;
  padding: 10px;
  align-items: center;
}

input {
  padding: 5px;
  margin-right: 5px;
  width: 130px;
  background-color: transparent;
  color: hsla(160, 100%, 37%, 1);
  border-radius: 5px;
  border-width: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

input::placeholder {
  color: hsla(160, 100%, 37%, 1);
}
input:hover {
  border-color: hsla(160, 100%, 37%, 1);
}

button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: transparent;
  border-radius: 5px;
  border-width: 2px;
  border-color: transparent;
  color: hsla(160, 100%, 37%, 1);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
button:hover {
  border-color: hsla(160, 100%, 37%, 1);
}
</style>
