// utils/imageUtils.ts

/**
 * Проверяет поддержку WebP формата браузером
 * Использует Canvas API для определения поддержки
 *
 * @returns {Promise<boolean>} Promise, который резолвится в true, если WebP поддерживается, иначе false
 */
let webPSupport: boolean | null = null;

export const supportsWebP = async (): Promise<boolean> => {
  // Кэшируем результат, чтобы не проверять каждый раз
  if (webPSupport !== null) {
    return webPSupport;
  }

  try {
    // Альтернативная проверка поддержки WebP с использованием Canvas API
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      webPSupport = false;
      return false;
    }

    // Проверяем, поддерживает ли Canvas WebP
    const isSupported = canvas.toDataURL('image/webp').indexOf('webp') > -1;
    webPSupport = isSupported;
    return isSupported;
  } catch (e) {
    webPSupport = false;
    return false;
  }
};

/**
 * Преобразует путь к PNG-изображению в путь к WebP-изображению
 *
 * @param {string} pngPath - Путь к PNG-изображению
 * @returns {string} Путь к WebP-изображению (с заменой расширения)
 */
export const getPngToWebpPath = (pngPath: string): string => {
  return pngPath.replace(/\.png$/, '.webp');
};

/**
 * Возвращает подходящий путь к изображению в зависимости от поддержки WebP браузером
 *
 * @param {string} pngPath - Исходный путь к PNG-изображению
 * @returns {Promise<string>} Promise, который резолвится в подходящий путь (WebP или PNG)
 */
export const getImagePath = async (pngPath: string): Promise<string> => {
  const supports = await supportsWebP();
  return supports ? getPngToWebpPath(pngPath) : pngPath;
};