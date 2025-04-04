<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const quote = ref(null);
const error = ref(null);

async function fetchQuote(id) {
  try {
    const response = await fetch(`https://dummyjson.com/quotes/${id}`);
    if (!response.ok) {
      throw new Error('Cita no encontrada');
    }
    quote.value = await response.json();
    error.value = null;
  } catch (err) {
    quote.value = null;
    error.value = err.message;
  }
}

watch(() => route.params.id, fetchQuote, { immediate: true });
</script>

<template>
  <div>
    <h2>Cita por ID</h2>
    <p v-if="quote">"{{ quote.quote }}" - {{ quote.author }}</p>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>