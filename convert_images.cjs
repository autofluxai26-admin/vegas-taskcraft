const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'MIS_IMAGENES_VEGAS_TASKCRAFT');
const outputFile = path.join(__dirname, 'src', 'assets', 'imagesData.ts');

const files = fs.readdirSync(inputDir);
const imagesMap = {};

files.forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
    const filePath = path.join(inputDir, file);
    const buffer = fs.readFileSync(filePath);
    const b64 = buffer.toString('base64');
    const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
    const filename = file.toLowerCase();

    let key = path.basename(file, ext);
    if (filename.includes('logo')) key = 'logo';
    else if (filename.includes('hero') || filename.includes('handyman')) key = 'hero_handyman';
    else if (filename.includes('tv')) key = 'tv_mounting';
    else if (filename.includes('art') || filename.includes('mirror')) key = 'art_mirror';
    else if (filename.includes('furniture')) key = 'furniture_assembly';
    else if (filename.includes('repair') || filename.includes('smarthome')) key = 'repairs_smarthome';
    else if (filename.includes('map') || filename.includes('carpet')) key = 'vegas_map_carpet';

    imagesMap[key] = `data:${mime};base64,${b64}`;
  }
});

const tsContent = `// Auto-generated Base64 Image Dictionary for Guaranteed Rendering
export const IMAGES: Record<string, string> = ${JSON.stringify(imagesMap, null, 2)};
`;

fs.writeFileSync(outputFile, tsContent, 'utf8');
console.log('Successfully generated src/assets/imagesData.ts with normalized keys:', Object.keys(imagesMap));
