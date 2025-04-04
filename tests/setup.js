import { vi } from 'vitest';

// Mock para `window` y `document`
global.window = global;
global.document = {};

// Mock para `console.error` y evitar mensajes innecesarios en los tests
vi.spyOn(console, 'error').mockImplementation(() => {});
