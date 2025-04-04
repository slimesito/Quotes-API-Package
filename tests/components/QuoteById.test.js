import { describe, it, expect, vi, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import QuoteById from '../../src/components/QuoteById.vue';

describe('QuoteById.vue', () => {
  afterEach(() => {
    vi.restoreAllMocks(); // Limpia mocks después de cada test
  });

  it('muestra una cita basada en ID', async () => {
    global.fetch = vi.fn((url) =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ quote: 'Quote for ID 1', author: 'Author 1' }),
      })
    );

    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/quote/:id', component: QuoteById }],
    });

    router.push('/quote/1');
    await router.isReady();

    const wrapper = mount(QuoteById, { global: { plugins: [router] } });
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('dummyjson.com/quotes/1'));
    expect(wrapper.text()).toContain('Cita por ID');
    expect(wrapper.text()).toContain('Quote for ID 1');
    expect(wrapper.text()).toContain('Author 1');
  });

  it('muestra un mensaje de error si la API falla', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/quote/:id', component: QuoteById }],
    });

    router.push('/quote/99');
    await router.isReady();

    const wrapper = mount(QuoteById, { global: { plugins: [router] } });
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(wrapper.text()).toContain('Cita no encontrada'); // Ajustado al mensaje real
  });
});
