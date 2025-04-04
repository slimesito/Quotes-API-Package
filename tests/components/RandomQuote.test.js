import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import RandomQuote from '../../src/components/RandomQuote.vue';

describe('RandomQuote.vue', () => {
  const mockSuccessResponse = {
    quote: "Life is what happens when you're busy making other plans",
    author: "John Lennon"
  };

  let wrapper;
  let originalConsoleError;

  beforeEach(() => {
    // Guardar y mockear console.error
    originalConsoleError = console.error;
    console.error = vi.fn();

    // Mock de fetch por defecto (éxito)
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse)
      })
    );
  });

  afterEach(() => {
    // Restaurar mocks y console.error original
    vi.restoreAllMocks();
    console.error = originalConsoleError;
    wrapper?.unmount();
  });

  it('muestra el título "Cita Aleatoria"', () => {
    wrapper = mount(RandomQuote);
    expect(wrapper.find('h2').text()).toBe('Cita Aleatoria');
  });

  it('muestra una cita aleatoria al cargar', async () => {
    wrapper = mount(RandomQuote);
    await flushPromises();

    expect(wrapper.text()).toContain(mockSuccessResponse.quote);
    expect(wrapper.text()).toContain(mockSuccessResponse.author);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/quotes/random');
  });

  it('obtiene una nueva cita al hacer clic en el botón', async () => {
    wrapper = mount(RandomQuote);
    await flushPromises();

    // Resetear el contador de llamadas a fetch
    fetch.mockClear();

    await wrapper.find('button').trigger('click');
    await flushPromises();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/quotes/random');
    expect(wrapper.text()).toContain(mockSuccessResponse.quote);
  });

  it('maneja errores de la API mostrando mensaje de error', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Network Error'))
    );

    wrapper = mount(RandomQuote);
    await flushPromises();

    // Verificar que se muestra el mensaje de error
    expect(wrapper.find('.error').exists()).toBe(true);
    expect(wrapper.find('.error').text()).toContain('No se pudo cargar la cita');

    // Verificar que no se muestra la cita
    expect(wrapper.find('p:not(.error)').exists()).toBe(false);

    // Verificar que el botón sigue funcionando
    expect(wrapper.find('button').exists()).toBe(true);

    // Verificar que se llamó a console.error
    expect(console.error).toHaveBeenCalled();
  });

  it('maneja respuestas no exitosas de la API', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: 'Server Error' })
      })
    );

    wrapper = mount(RandomQuote);
    await flushPromises();

    expect(wrapper.find('.error').exists()).toBe(true);
    expect(wrapper.text()).toContain('No se pudo cargar la cita');
    expect(console.error).toHaveBeenCalled();
  });

  it('no muestra mensaje de error inicialmente', () => {
    wrapper = mount(RandomQuote);
    expect(wrapper.find('.error').exists()).toBe(false);
  });
});

function flushPromises() {
  return new Promise(resolve => setTimeout(resolve, 0));
}
