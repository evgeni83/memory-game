// utils/performanceMonitor.ts
class PerformanceMonitor {
  private marks: Map<string, number> = new Map();
  private measures: Map<string, { startTime: number, endTime: number, duration: number }> = new Map();

  /**
   * Отметка времени для начала измерения
   */
  public mark(name: string) {
    this.marks.set(name, performance.now());
  }

  /**
   * Измерение продолжительности между двумя метками
   */
  public measure(measureName: string, startMark: string, endMark: string) {
    const startTime = this.marks.get(startMark);
    const endTime = this.marks.get(endMark);

    if (startTime !== undefined && endTime !== undefined) {
      const duration = endTime - startTime;
      this.measures.set(measureName, {
        startTime,
        endTime,
        duration
      });

      // Выводим результаты в продакшене только если они превышают определенный порог
      if (duration > 100) { // Порог в 100 миллисекунд
        console.warn(`Performance warning: ${measureName} took ${duration.toFixed(2)}ms`);
      }
    }
  }

  /**
   * Получение результатов измерения
   */
  public getMeasure(measureName: string) {
    return this.measures.get(measureName);
  }

  /**
   * Получение всех результатов измерений
   */
  public getAllMeasures() {
    return new Map(this.measures);
  }

  /**
   * Очистка всех данных
   */
  public clear() {
    this.marks.clear();
    this.measures.clear();
  }

  /**
   * Измерение производительности функции
   */
  public async measureFunction<T>(
    fn: () => Promise<T> | T, 
    measureName: string
  ) {
    this.mark(`${measureName}_start`);
    
    try {
      const result = await Promise.resolve(fn());
      this.mark(`${measureName}_end`);
      this.measure(measureName, `${measureName}_start`, `${measureName}_end`);
      
      return result;
    } catch (error) {
      this.mark(`${measureName}_end`);
      this.measure(measureName, `${measureName}_start`, `${measureName}_end`);
      throw error;
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();