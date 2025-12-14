const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Для использования imagemin v9, нам нужно использовать ES6 модули или использовать динамический импорт
async function runOptimization() {
  console.log('Инициализация оптимизации изображений...');
  
  // Динамически импортируем модули
  const imagemin = (await import('imagemin')).default;
  const imageminPngquant = (await import('imagemin-pngquant')).default;
  const imageminWebp = (await import('imagemin-webp')).default;
  
  const imagesDir = path.join(__dirname, 'public', 'images');
  
  // Получаем все PNG файлы
  const pngFiles = fs.readdirSync(imagesDir).filter(file => 
    path.extname(file).toLowerCase() === '.png' && 
    file !== 'favicon.ico' // Исключаем favicon.ico
  ).map(file => path.join(imagesDir, file));
  
  console.log(`Найдено ${pngFiles.length} PNG изображений для оптимизации`);
  
  // Оптимизируем PNG
  console.log('Оптимизация PNG изображений...');
  try {
    await imagemin(pngFiles, {
      destination: imagesDir,
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8] // Устанавливаем качество от 60% до 80%
        })
      ]
    });
    
    console.log(`Оптимизировано ${pngFiles.length} PNG изображений`);
  } catch (error) {
    console.error('Ошибка при оптимизации PNG:', error);
  }
  
  // Создание WebP версий изображений
  console.log('Создание WebP версий изображений...');
  try {
    for (const pngFile of pngFiles) {
      const webpFile = pngFile.replace('.png', '.webp');
      await imagemin([pngFile], {
        destination: path.dirname(webpFile),
        plugins: [
          imageminWebp({ quality: 75 })
        ]
      });
      console.log(`Создан WebP файл: ${webpFile}`);
    }
  } catch (error) {
    console.error('Ошибка при создании WebP версий:', error);
  }
  
  console.log('Оптимизация изображений завершена!');
}

runOptimization().catch(console.error);