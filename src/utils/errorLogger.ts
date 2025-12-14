// utils/errorLogger.ts
interface ErrorLog {
  message: string;
  stack?: string;
  timestamp: Date;
  userAgent?: string;
  url?: string;
}

class ErrorLogger {
  private logs: ErrorLog[] = [];
  private readonly MAX_LOGS = 100; // Ограничиваем количество хранимых логов

  public logError(error: Error, context?: string) {
    const errorLog: ErrorLog = {
      message: context ? `${context}: ${error.message}` : error.message,
      stack: error.stack,
      timestamp: new Date(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    };

    this.logs.push(errorLog);

    // Ограничиваем размер логов
    if (this.logs.length > this.MAX_LOGS) {
      this.logs.shift();
    }

    // В продакшене можно добавить отправку логов на удаленный сервер
    if (process.env.NODE_ENV === 'production') {
      this.reportToRemote(errorLog);
    } else {
      // В дев-режиме просто выводим в консоль
      console.error('Logged error:', errorLog);
    }
  }

  private reportToRemote(errorLog: ErrorLog) {
    // В реальном приложении здесь была бы отправка на сервис мониторинга ошибок
    // Например: Sentry, LogRocket и т.д.
    console.log('Reporting error to remote service:', errorLog);
  }

  public getLogs(): ErrorLog[] {
    return [...this.logs]; // Возвращаем копию массива
  }

  public clearLogs() {
    this.logs = [];
  }
}

export const errorLogger = new ErrorLogger();