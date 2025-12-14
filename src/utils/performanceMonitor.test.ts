import { performanceMonitor } from './performanceMonitor';

// Мокаем performance API
const mockPerformance = {
  now: jest.fn(),
};
Object.defineProperty(global, 'performance', {
  value: mockPerformance,
  writable: true,
});

describe('Performance Monitor', () => {
  beforeEach(() => {
    mockPerformance.now.mockClear();
    mockPerformance.now.mockReturnValue(0);

    // Очищаем измерения
    performanceMonitor.clear();
  });

  it('records marks correctly', () => {
    performanceMonitor.mark('test-mark');

    // Проверяем, что внутреннее состояние обновлено
    // Это покрытие для mark метода
    expect(() => {
      performanceMonitor.mark('another-mark');
    }).not.toThrow();
  });

  it('measures duration between marks', () => {
    mockPerformance.now.mockReturnValueOnce(1000).mockReturnValueOnce(2500);

    performanceMonitor.mark('start');
    performanceMonitor.mark('end');

    performanceMonitor.measure('test-measure', 'start', 'end');

    const result = performanceMonitor.getMeasure('test-measure');
    expect(result).toBeDefined();
    expect(result?.startTime).toBe(1000);
    expect(result?.endTime).toBe(2500);
    expect(result?.duration).toBe(1500);
  });

  it('returns all measures', () => {
    mockPerformance.now.mockReturnValueOnce(1000).mockReturnValueOnce(2000);

    performanceMonitor.mark('start');
    performanceMonitor.mark('end');
    performanceMonitor.measure('test-measure', 'start', 'end');

    const allMeasures = performanceMonitor.getAllMeasures();
    expect(allMeasures.size).toBe(1);
    expect(allMeasures.has('test-measure')).toBe(true);
  });

  it('clears all data', () => {
    mockPerformance.now.mockReturnValueOnce(1000).mockReturnValueOnce(2000);

    performanceMonitor.mark('start');
    performanceMonitor.mark('end');
    performanceMonitor.measure('test-measure', 'start', 'end');

    expect(performanceMonitor.getAllMeasures().size).toBe(1);

    performanceMonitor.clear();

    expect(performanceMonitor.getAllMeasures().size).toBe(0);
  });

  it('measures function execution time', async () => {
    mockPerformance.now
      .mockReturnValueOnce(1000) // для начала функции
      .mockReturnValueOnce(1500); // для конца функции

    const testFunction = jest.fn().mockResolvedValue('result');

    const result = await performanceMonitor.measureFunction(testFunction, 'function-test');

    expect(result).toBe('result');
    expect(testFunction).toHaveBeenCalledTimes(1);

    const measure = performanceMonitor.getMeasure('function-test');
    expect(measure).toBeDefined();
    expect(measure?.duration).toBe(500); // 1500 - 1000 = 500
  });

  it('handles function execution error', async () => {
    mockPerformance.now
      .mockReturnValueOnce(1000) // для начала измерения
      .mockReturnValueOnce(1100) // для конца измерения
      .mockReturnValueOnce(1100) // для начала измерения функции
      .mockReturnValueOnce(1600); // для конца измерения функции

    const errorFunction = jest.fn().mockRejectedValue(new Error('Test error'));

    await expect(performanceMonitor.measureFunction(errorFunction, 'error-test')).rejects.toThrow('Test error');

    const measure = performanceMonitor.getMeasure('error-test');
    expect(measure).toBeDefined();
  });

  it('warns about slow performance', async () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    mockPerformance.now
      .mockReturnValueOnce(1000) // для начала функции
      .mockReturnValueOnce(1101); // для конца функции (>100ms)

    const slowFunction = jest.fn().mockResolvedValue('result');

    await performanceMonitor.measureFunction(slowFunction, 'slow-test');

    // Проверяем, что было вызвано хотя бы одно предупреждение о медленной производительности
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('Performance warning:'));
    // Проверяем, что есть вызов с нужным именем
    const calls = consoleWarnSpy.mock.calls;
    const hasSlowTestWarning = calls.some(call => call[0].includes('slow-test took'));
    expect(hasSlowTestWarning).toBe(true);

    consoleWarnSpy.mockRestore();
  });
});