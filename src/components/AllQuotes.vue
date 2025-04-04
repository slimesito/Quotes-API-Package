<script setup>
import { ref, onMounted } from 'vue';

const quotes = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
    error.value = null;
    const response = await fetch('https://dummyjson.com/quotes');

    if (!response.ok) {
      throw new Error('Error al obtener las citas');
    }

    const data = await response.json();
    quotes.value = data.quotes;
  } catch (err) {
    error.value = 'No se pudieron cargar las citas';
    console.error('Error fetching quotes:', err);
  }
});
</script>

<template>
  <div>
    <h2>Todas las Citas</h2>
    <p v-if="error" class="error">{{ error }}</p>
    <ul v-else>
      <li v-for="quote in quotes" :key="quote.id">
        "{{ quote.quote }}" - {{ quote.author }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.error {
  color: #ff4444;
}
</style>
