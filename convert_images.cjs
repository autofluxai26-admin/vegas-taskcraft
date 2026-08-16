const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'MIS_IMAGENES_VEGAS_TASKCRAFT');
const outputFile = path.join(__dirname, 'src', 'assets', 'imagesData.ts');

const imagesMap = {};

const mapping = {
  'art_mirror': ['art_mirror.png.jpeg', 'art_mirror.png', 'art_mirror.jpg'],
  'furniture_assembly': ['furniture_assembly.png.PNG', 'furniture_assembly.png', 'furniture_assembly.jpg'],
  'hero_handyman': ['hero_handyman.png.jpeg', 'hero_handyman.png', 'hero_handyman.jpg'],
  'logo': ['logo.png', 'logo.png.png'],
  'repairs_smarthome': ['repairs_smarthome.png.PNG', 'repairs_smarthome.png', 'repairs_smarthome.jpg'],
  'curtains_painting': ['curtains_painting.jpg', 'curtains_painting.png'],
  'smarthome_security': ['smarthome_security.jpg', 'smarthome_security.png'],
  'tv_mounting': ['tv_mounting.png.jpeg', 'tv_mounting.png', 'tv_mounting.jpg'],
  'vegas_map_carpet': ['vegas_map_carpet.png.PNG', 'vegas_map_carpet.png', 'vegas_map_carpet.jpg']
};

for (const [key, candidates] of Object.entries(mapping)) {
  for (const candidate of candidates) {
    const fullPath = path.join(inputDir, candidate);
    if (fs.existsSync(fullPath)) {
      const buffer = fs.readFileSync(fullPath);
      const b64 = buffer.toString('base64');
      const ext = candidate.toLowerCase();
      const mime = ext.includes('png') ? 'image/png' : 'image/jpeg';
      imagesMap[key] = `data:${mime};base64,${b64}`;
      console.log(`Mapped key "${key}" from ${candidate}`);
      break;
    }
  }
}

const tsContent = `// Auto-generated Base64 Image Dictionary for Guaranteed Rendering
export const IMAGES: Record<string, string> = ${JSON.stringify(imagesMap, null, 2)};
`;

fs.writeFileSync(outputFile, tsContent, 'utf8');
console.log('Successfully generated src/assets/imagesData.ts with total keys:', Object.keys(imagesMap).length);
