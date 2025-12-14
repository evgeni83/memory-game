import { errorLogger } from './errorLogger';

// Мокаем консоль
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Error Logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    errorLogger.clearLogs(); // Очищаем логи перед каждым тестом
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  it('logs errors correctly', () => {
    const error = new Error('Test error');
    const context = 'Test context';

    errorLogger.logError(error, context);

    const logs = errorLogger.getLogs();
    expect(logs).toHaveLength(1);
    expect(logs[0].message).toBe(`${context}: ${error.message}`);
    expect(logs[0].stack).toBe(error.stack);
    expect(logs[0].timestamp).toBeInstanceOf(Date);
  });

  it('logs errors without context', () => {
    const error = new Error('Test error without context');

    errorLogger.logError(error);

    const logs = errorLogger.getLogs();
    expect(logs).toHaveLength(1);
    expect(logs[0].message).toBe(error.message);
  });

  it('handles errors in production environment', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const error = new Error('Production error');

    errorLogger.logError(error);

    expect(consoleLogSpy).toHaveBeenCalledWith('Reporting error to remote service:', expect.anything());

    process.env.NODE_ENV = originalEnv;
  });

  it('handles errors in development environment', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const error = new Error('Development error');

    errorLogger.logError(error);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Logged error:', expect.anything());

    process.env.NODE_ENV = originalEnv;
  });

  it('maintains log history with maximum limit', () => {
    // Логируем больше ошибок, чем максимальный лимит
    for (let i = 0; i < 105; i++) {
      errorLogger.logError(new Error(`Error ${i}`));
    }

    const logs = errorLogger.getLogs();
    expect(logs).toHaveLength(100); // Должно быть ограничено MAX_LOGS
    expect(logs[0].message).toBe('Error 5'); // Первая ошибка должна быть с индексом 5
  });

  it('clears logs correctly', () => {
    errorLogger.logError(new Error('Test error'));

    expect(errorLogger.getLogs()).toHaveLength(1);

    errorLogger.clearLogs();

    expect(errorLogger.getLogs()).toHaveLength(0);
  });

  it('returns copy of logs array', () => {
    errorLogger.logError(new Error('Test error'));

    const logs1 = errorLogger.getLogs();
    const logs2 = errorLogger.getLogs();

    expect(logs1).not.toBe(logs2); // Должны быть разными массивами
    expect(logs1).toEqual(logs2); // Но с одинаковыми данными
  });
});