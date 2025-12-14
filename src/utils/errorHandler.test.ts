import { logError, setupGlobalErrorHandler } from './errorHandler';

// Мокаем консоль
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

// Мокаем глобальные объекты
const addEventListenerSpy = jest.spyOn(window, 'addEventListener').mockImplementation(() => {});
const documentAddEventListenerSpy = jest.spyOn(document, 'addEventListener').mockImplementation(() => {});

describe('Error Handler Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  describe('logError', () => {
    it('logs error message when error occurs', () => {
      const errorInfo = {
        message: 'Test error',
        stack: 'Test stack',
        url: 'test.js',
        source: 'javascript'
      };

      logError(errorInfo);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Application Error:', errorInfo);
    });

    it('logs error with minimal information', () => {
      const errorInfo = {
        message: 'Simple error message'
      };

      logError(errorInfo);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Application Error:', errorInfo);
    });
  });

  describe('setupGlobalErrorHandler', () => {
    it('registers event listeners', () => {
      setupGlobalErrorHandler();

      expect(addEventListenerSpy).toHaveBeenCalledWith('error', expect.any(Function));
      expect(addEventListenerSpy).toHaveBeenCalledWith('unhandledrejection', expect.any(Function));
      expect(documentAddEventListenerSpy).toHaveBeenCalledWith('error', expect.any(Function), true);
    });
  });
});