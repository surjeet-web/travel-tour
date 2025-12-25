  const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const allFiles = [];

function collectFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath);
    } else if (entry.name.match(/\.(ts|tsx|js|jsx)$/)) {
      allFiles.push(fullPath);
    }
  }
}

collectFiles(srcDir);

console.log('Total files:', allFiles.length);

// Map from relative path without extension to full path
const fileMap = new Map();
allFiles.forEach(file => {
  const rel = path.relative(srcDir, file).replace(/\\.[^/.]+$/, '');
  fileMap.set(rel, file);
});

// Build import map
const importMap = new Map();
const importRegex = /from\s+['"](\.\.?\/[^'"]+)['"]/g;
const requireRegex = /require\(['"](\.\.?\/[^'"]+)['"]\)/g;

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const imports = [];
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  while ((match = requireRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  const relFile = path.relative(srcDir, file);
  importMap.set(relFile, imports);
});

// Determine which files are imported
const importedSet = new Set();
importMap.forEach((imports, file) => {
  imports.forEach(imp => {
    // resolve import relative to file's directory
    const impPath = path.join(path.dirname(file), imp);
    // normalize path
    const normalized = impPath.replace(/\\/g, '/').replace(/\/+/g, '/');
    importedSet.add(normalized);
  });
});

// Entry points that are not imported but are used
const entryPoints = ['App.tsx', 'main.tsx', 'navigation/Navigation.tsx'].map(p => p.replace(/\.[^/.]+$/, ''));

// Also consider files that are imported via index.ts?
// For now, just compute unused
const unused = [];
allFiles.forEach(file => {
  const rel = path.relative(srcDir, file).replace(/\\.[^/.]+$/, '').replace(/\\/g, '/');
  if (!importedSet.has(rel) && !entryPoints.includes(rel)) {
    unused.push(file);
  }
});

console.log('Unused files:', unused.length);
unused.forEach(f => console.log(f));

// Write to file for reference
fs.writeFileSync('unused.txt', unused.join('\n'));