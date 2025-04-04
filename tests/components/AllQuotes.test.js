import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import AllQuotes from '../../src/components/AllQuotes.vue';

describe('AllQuotes.vue', () => {
  const mockQuotes = [
    { id: 1, quote: "Test Quote 1", author: "Test Author 1" },
    { id: 2, quote: "Test Quote 2", author: "Test Author 2" }
  ];

  let wrapper;
  let originalConsoleError;

  beforeEach(() => {
    // Guardar console.error original y reemplazarlo con un mock
    originalConsoleError = console.error;
    console.error = vi.fn();

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ quotes: mockQuotes })
      })
    );
  });

  afterEach(() => {
    // Restaurar console.error original
    console.error = originalConsoleError;
    vi.restoreAllMocks();
    wrapper?.unmount();
  });

  it('renderiza el título correctamente', () => {
    wrapper = mount(AllQuotes);
    expect(wrapper.find('h2').text()).toBe('Todas las Citas');
  });

  it('carga y muestra las citas correctamente', async () => {
    wrapper = mount(AllQuotes);
    await flushPromises();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/quotes');

    const listItems = wrapper.findAll('li');
    expect(listItems).toHaveLength(mockQuotes.length);

    mockQuotes.forEach((quote, index) => {
      expect(listItems[index].text()).toContain(quote.quote);
      expect(listItems[index].text()).toContain(quote.author);
    });

    // Verificar que no se llamó a console.error en el caso exitoso
    expect(console.error).not.toHaveBeenCalled();
  });

  it('maneja errores de la API mostrando mensaje de error', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Network Error'))
    );

    wrapper = mount(AllQuotes);
    await flushPromises();

    expect(wrapper.find('.error').exists()).toBe(true);
    expect(wrapper.find('.error').text()).toContain('No se pudieron cargar las citas');
    expect(wrapper.findAll('li')).toHaveLength(0);

    // Verificar que se llamó a console.error (pero el mock evita que se muestre en consola)
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

    wrapper = mount(AllQuotes);
    await flushPromises();

    expect(wrapper.find('.error').exists()).toBe(true);
    expect(wrapper.find('.error').text()).toContain('No se pudieron cargar las citas');
    expect(wrapper.findAll('li')).toHaveLength(0);

    // Verificar que se llamó a console.error (pero el mock evita que se muestre en consola)
    expect(console.error).toHaveBeenCalled();
  });
});

function flushPromises() {
  return new Promise(resolve => setTimeout(resolve, 0));
}
