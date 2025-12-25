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
  const rel = path.relative(srcDir, file).replace(/\\.[^/.]+$/, '').replace(/\\/g, '/');
  fileMap.set(rel, file);
});

// Build import map
const importMap = new Map();
// regex for: from '...' and from "..."
const importRegex = /from\s+['"](\.\.?\/[^'"]+)['"]/g;
// regex for: import('...') and import("...")
const dynamicImportRegex = /import\s*\(\s*['"](\.\.?\/[^'"]+)['"]\s*\)/g;
// regex for: require('...')
const requireRegex = /require\s*\(\s*['"](\.\.?\/[^'"]+)['"]\s*\)/g;

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const imports = [];
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  while ((match = dynamicImportRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  while ((match = requireRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  const relFile = path.relative(srcDir, file).replace(/\\/g, '/');
  importMap.set(relFile, imports);
});

// Determine which files are imported
const importedSet = new Set();
importMap.forEach((imports, file) => {
  imports.forEach(imp => {
    // resolve import relative to file's directory
    const impPath = path.join(path.dirname(file), imp).replace(/\\/g, '/');
    // normalize path
    const normalized = impPath.replace(/\/+/g, '/');
    importedSet.add(normalized);
  });
});

// Entry points that are not imported but are used
const entryPoints = ['App.tsx', 'main.tsx', 'navigation/Navigation.tsx'].map(p => p.replace(/\.[^/.]+$/, '').replace(/\\/g, '/'));
entryPoints.forEach(ep => importedSet.add(ep));

// Also add any file that is referenced in public/index.html? Not needed.

// Find unused files
const unused = [];
allFiles.forEach(file => {
  const rel = path.relative(srcDir, file).replace(/\\.[^/.]+$/, '').replace(/\\/g, '/');
  if (!importedSet.has(rel)) {
    unused.push(file);
  }
});

console.log('Unused files:', unused.length);
unused.forEach(f => console.log(f));

// Write to file for reference
fs.writeFileSync('unused2.txt', unused.join('\n'));