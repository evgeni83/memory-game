// utils/errorHandler.ts
interface ErrorInfo {
  message: string;
  stack?: string;
  url?: string;
  source?: string;
}

export const logError = (error: ErrorInfo) => {
  // Логируем ошибку в консоль
  console.error('Application Error:', {
    message: error.message,
    stack: error.stack,
    url: error.url,
    source: error.source
  });

  // Здесь можно добавить отправку ошибки на сервер или в систему мониторинга
  // например: sendErrorToService(error);
};

export const setupGlobalErrorHandler = () => {
  // Обработчик для ошибок JavaScript
  window.addEventListener('error', (event) => {
    logError({
      message: event.message,
      stack: event.error?.stack,
      url: event.filename,
      source: 'javascript'
    });
  });

  // Обработчик для ошибок, не пойманных catch
  window.addEventListener('unhandledrejection', (event) => {
    logError({
      message: (event.reason && event.reason.message) ? event.reason.message : String(event.reason),
      stack: event.reason?.stack,
      source: 'promise'
    });
  });

  // Обработчик для ошибок изображений
  document.addEventListener('error', (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'IMG') {
      console.warn(`Image failed to load: ${target.getAttribute('src')}`);
      // Здесь можно заменить изображение заглушкой или выполнить другие действия
    }
  }, true);
};