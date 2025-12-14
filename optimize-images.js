const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// To use imagemin v9, we need to use ES6 modules or dynamic import
async function runOptimization() {
  console.log('Initializing image optimization...');

  // Dynamically import modules
  const imagemin = (await import('imagemin')).default;
  const imageminPngquant = (await import('imagemin-pngquant')).default;
  const imageminWebp = (await import('imagemin-webp')).default;

  const imagesDir = path.join(__dirname, 'public', 'images');

  // Get all PNG files
  const pngFiles = fs.readdirSync(imagesDir).filter(file =>
    path.extname(file).toLowerCase() === '.png' &&
  file !== 'favicon.ico' // Exclude favicon.ico
  ).map(file => path.join(imagesDir, file));

  console.log(`Found ${pngFiles.length} PNG images for optimization`);

  // Optimize PNG
  console.log('Optimizing PNG images...');
  try {
    await imagemin(pngFiles, {
      destination: imagesDir,
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8] // Set quality from 60% to 80%
        })
      ]
    });

    console.log(`Optimized ${pngFiles.length} PNG images`);
  } catch (error) {
    console.error('Error optimizing PNG:', error);
  }

  // Create WebP versions of images
  console.log('Creating WebP versions of images...');
  try {
    for (const pngFile of pngFiles) {
      const webpFile = pngFile.replace('.png', '.webp');
      await imagemin([pngFile], {
        destination: path.dirname(webpFile),
        plugins: [
          imageminWebp({ quality: 75 })
        ]
      });
      console.log(`Created WebP file: ${webpFile}`);
    }
  } catch (error) {
    console.error('Error creating WebP versions:', error);
  }

  console.log('Image optimization completed!');
}

runOptimization().catch(console.error);
