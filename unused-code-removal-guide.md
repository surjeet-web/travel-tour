# 🧹 Complete Guide to Removing Unused Code

## Overview
This guide teaches you how to systematically identify and remove unused CSS, JavaScript, React components, and dependencies from any project. This process improves performance, reduces bundle size, and makes your codebase more maintainable.

## 🔍 **Step 1: Analyze Your Codebase**

### 1.1 Identify Entry Points
Start by understanding your application's entry points:
- `src/main.tsx` or `src/index.tsx` (React entry point)
- `src/App.tsx` (Main app component)
- `src/navigation/Navigation.tsx` or routing files
- `index.html` (HTML entry point)

### 1.2 Map Component Usage
Create a mental map of what's actually being used:
```bash
# Search for component imports across the codebase
grep -r "import.*ComponentName" src/
# or using ripgrep (faster)
rg "import.*ComponentName" src/
```

## 🗂️ **Step 2: Remove Unused React Components**

### 2.1 Find Unused Components
```bash
# Find all component files
find src/components -name "*.tsx" -o -name "*.ts"

# For each component, check if it's imported anywhere
grep -r "import.*ComponentName" src/
grep -r "from.*ComponentName" src/
```

### 2.2 Systematic Component Removal
1. **Start with leaf components** (components that don't import other components)
2. **Check page components** that are no longer routed
3. **Remove data files** that are no longer used
4. **Clean up utility functions** that are no longer referenced

### 2.3 Tools for Automated Detection
```bash
# Install and use unimported to find unused files
npm install -g unimported
unimported

# Use ts-unused-exports for TypeScript projects
npm install -g ts-unused-exports
ts-unused-exports tsconfig.json
```

## 📦 **Step 3: Remove Unused Dependencies**

### 3.1 Find Unused NPM Packages
```bash
# Install depcheck to find unused dependencies
npm install -g depcheck
depcheck

# Alternative: use npm-check
npm install -g npm-check
npm-check
```

### 3.2 Manual Dependency Check
For each dependency in `package.json`, search if it's used:
```bash
# Check if a package is imported
grep -r "from 'package-name'" src/
grep -r "import.*package-name" src/
grep -r "require.*package-name" src/

# Check for dynamic imports
grep -r "import('package-name')" src/
```

### 3.3 Common Unused Dependencies
- **Development tools** that are no longer needed
- **UI libraries** that were replaced
- **Utility libraries** that are no longer used
- **Type definitions** for removed packages

## 🎨 **Step 4: Remove Unused CSS/SCSS**

### 4.1 Identify Unused Styles
```bash
# Find all CSS/SCSS files
find src/ public/ -name "*.css" -o -name "*.scss"

# Check if CSS classes are used in components
grep -r "className.*class-name" src/
grep -r "class.*class-name" src/
```

### 4.2 Tools for CSS Cleanup
```bash
# Install PurgeCSS to remove unused CSS
npm install -g purgecss

# Run PurgeCSS on your build
purgecss --css dist/**/*.css --content dist/**/*.html dist/**/*.js --output dist/
```

### 4.3 SCSS Import Cleanup
1. **Check main SCSS file** for unused imports
2. **Remove unused partial files**
3. **Clean up unused mixins and variables**

## 🛠️ **Step 5: Automated Tools & Scripts**

### 5.1 Bundle Analyzer
```bash
# Analyze your bundle size
npm install -g webpack-bundle-analyzer
# For Vite projects
npm run build
npx vite-bundle-analyzer dist/
```

### 5.2 ESLint Rules for Unused Code
Add to `.eslintrc.js`:
```javascript
{
  "rules": {
    "no-unused-vars": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### 5.3 Custom Scripts
Add to `package.json`:
```json
{
  "scripts": {
    "find-unused": "unimported",
    "check-deps": "depcheck",
    "analyze-bundle": "npm run build && npx vite-bundle-analyzer dist/",
    "clean-unused": "npm run find-unused && npm run check-deps"
  }
}
```

## 🔄 **Step 6: Systematic Removal Process**

### 6.1 Safe Removal Order
1. **Remove unused pages/routes first**
2. **Remove components used only by deleted pages**
3. **Remove data files and utilities**
4. **Remove CSS/SCSS files**
5. **Remove dependencies**
6. **Clean up imports and exports**

### 6.2 Testing After Removal
```bash
# Build the project to check for errors
npm run build

# Run tests to ensure nothing is broken
npm test

# Check for TypeScript errors
npx tsc --noEmit
```

## 📊 **Step 7: Measuring Impact**

### 7.1 Before/After Comparison
```bash
# Check bundle size before cleanup
npm run build
du -sh dist/

# After cleanup, compare
npm run build
du -sh dist/

# Detailed analysis
npx bundlesize
```

### 7.2 Performance Metrics
- **Bundle size reduction**
- **Build time improvement**
- **Runtime performance**
- **Memory usage**

## 🚀 **Step 8: Advanced Techniques**

### 8.1 Tree Shaking Optimization
Ensure your bundler can tree-shake effectively:
```javascript
// Use named imports instead of default imports
import { specificFunction } from 'library';
// Instead of
import library from 'library';
```

### 8.2 Dynamic Imports for Code Splitting
```javascript
// Lazy load components
const LazyComponent = lazy(() => import('./LazyComponent'));

// Dynamic imports for utilities
const utils = await import('./utils');
```

### 8.3 Conditional Loading
```javascript
// Load code only when needed
if (condition) {
  const { heavyFunction } = await import('./heavyModule');
  heavyFunction();
}
```

## 🛡️ **Step 9: Prevention Strategies**

### 9.1 Regular Audits
```bash
# Set up monthly dependency audits
npm audit
npm outdated

# Regular unused code checks
npm run find-unused
```

### 9.2 CI/CD Integration
Add to your CI pipeline:
```yaml
# GitHub Actions example
- name: Check for unused dependencies
  run: |
    npm install -g depcheck
    depcheck --fail-on-unused

- name: Check bundle size
  run: |
    npm run build
    npx bundlesize
```

### 9.3 Code Review Practices
- **Review imports** in every PR
- **Check for unused props** in components
- **Verify CSS classes** are actually used
- **Question new dependencies**

## 📋 **Step 10: Checklist for Each Project**

### Before Starting:
- [ ] Backup your project
- [ ] Create a new branch
- [ ] Document current bundle size
- [ ] Run existing tests

### During Cleanup:
- [ ] Remove unused pages/routes
- [ ] Remove unused components
- [ ] Remove unused data files
- [ ] Remove unused utilities
- [ ] Remove unused CSS/SCSS
- [ ] Remove unused dependencies
- [ ] Update imports/exports

### After Cleanup:
- [ ] Build project successfully
- [ ] Run all tests
- [ ] Check TypeScript compilation
- [ ] Measure bundle size reduction
- [ ] Test critical user flows
- [ ] Update documentation

## 🎯 **Expected Results**

After following this guide, you should see:
- **20-50% reduction** in bundle size
- **Faster build times**
- **Improved runtime performance**
- **Cleaner, more maintainable codebase**
- **Reduced security vulnerabilities**

## 🔧 **Tools Summary**

### Essential Tools:
- **unimported** - Find unused files
- **depcheck** - Find unused dependencies
- **ts-unused-exports** - Find unused TypeScript exports
- **PurgeCSS** - Remove unused CSS
- **webpack-bundle-analyzer** - Analyze bundle size

### IDE Extensions:
- **TypeScript Hero** (VS Code) - Organize imports
- **Auto Import - ES6** (VS Code) - Manage imports
- **CSS Peek** (VS Code) - Find CSS usage

## 💡 **Pro Tips**

1. **Start small** - Remove one component at a time
2. **Use version control** - Commit frequently during cleanup
3. **Test thoroughly** - Don't skip testing after removals
4. **Document changes** - Keep track of what you removed
5. **Automate checks** - Set up regular audits
6. **Be conservative** - When in doubt, keep it
7. **Measure impact** - Track bundle size improvements

This systematic approach will help you maintain a clean, efficient codebase in any project!