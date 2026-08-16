const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const inputLogoPath = 'C:/Users/rodge/.gemini/antigravity/brain/e22a7045-b062-4ccf-ab20-929ae68ca5ea/.user_uploaded/media_1786911359779.png';
const outputLogoDir = path.join(__dirname, 'MIS_IMAGENES_VEGAS_TASKCRAFT');
const outputLogoPath = path.join(outputLogoDir, 'logo.png');

if (!fs.existsSync(inputLogoPath)) {
  console.error('Input logo not found at:', inputLogoPath);
  process.exit(1);
}

fs.createReadStream(inputLogoPath)
  .pipe(new PNG())
  .on('parsed', function () {
    const width = this.width;
    const height = this.height;

    // Convert pure white and light gray background pixels (R,G,B > 235) to transparent
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];

        // Check if pixel is white/near-white background
        if (r > 235 && g > 235 && b > 235) {
          this.data[idx + 3] = 0; // Make alpha transparent
        } else if (r > 220 && g > 220 && b > 220) {
          // Smooth edge antialiasing for light pixels
          const alphaFactor = (255 - Math.max(r, g, b)) / 35;
          this.data[idx + 3] = Math.round(this.data[idx + 3] * Math.min(1, Math.max(0, alphaFactor)));
        }
      }
    }

    this.pack().pipe(fs.createWriteStream(outputLogoPath)).on('finish', () => {
      console.log('Successfully created transparent logo at:', outputLogoPath);
    });
  });
