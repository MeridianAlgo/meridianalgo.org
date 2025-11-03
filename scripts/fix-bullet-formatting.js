import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Script to fix bullet point formatting in lesson JSON files
 * Adds proper line breaks between bullet points for better readability
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LESSONS_DIR = path.join(__dirname, '../public/data/lessons/modules');

// Process ALL modules (set to null to process all, or specify array of module names)
const MODULES_TO_FIX = null; // null means process all modules

function fixBulletFormatting(content) {
  // Replace patterns where bullet points are on consecutive lines without spacing
  let fixed = content;
  
  // Fix bullet points that appear after text without proper spacing
  // Pattern 1: Text followed by space and bullet (inline bullets)
  // Example: "text • bullet1 • bullet2" -> "text\n\n• bullet1\n\n• bullet2"
  fixed = fixed.replace(/([.!?:]) • /g, '$1\n\n• ');
  
  // Pattern 2: Bullet points directly after each other with only single newline
  // Example: "• item1\n• item2" -> "• item1\n\n• item2"
  fixed = fixed.replace(/(\n• [^\n]+)(\n• )/g, '$1\n$2');
  
  // Pattern 3: Multiple bullets in a row without any newlines (inline)
  // Example: "• item1 • item2 • item3" -> "• item1\n\n• item2\n\n• item3"
  fixed = fixed.replace(/ • /g, '\n\n• ');
  
  return fixed;
}

function processJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(content);
    
    let modified = false;
    
    // Process sections array if it exists
    if (jsonData.sections && Array.isArray(jsonData.sections)) {
      jsonData.sections.forEach(section => {
        if (section.content && typeof section.content === 'string') {
          const originalContent = section.content;
          section.content = fixBulletFormatting(section.content);
          if (section.content !== originalContent) {
            modified = true;
          }
        }
        
        // Also check points array in key-points sections
        if (section.points && Array.isArray(section.points)) {
          section.points.forEach(point => {
            if (point.description && typeof point.description === 'string') {
              const originalDesc = point.description;
              point.description = fixBulletFormatting(point.description);
              if (point.description !== originalDesc) {
                modified = true;
              }
            }
          });
        }
      });
    }
    
    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
      console.log(`✅ Fixed: ${path.relative(LESSONS_DIR, filePath)}`);
      return true;
    } else {
      console.log(`⏭️  Skipped (no changes needed): ${path.relative(LESSONS_DIR, filePath)}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processModule(moduleName) {
  const modulePath = path.join(LESSONS_DIR, moduleName, 'lessons');
  
  if (!fs.existsSync(modulePath)) {
    console.log(`⚠️  Module lessons directory not found: ${moduleName}`);
    return 0;
  }
  
  console.log(`\n📂 Processing module: ${moduleName}`);
  
  const files = fs.readdirSync(modulePath);
  let fixedCount = 0;
  
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const filePath = path.join(modulePath, file);
      if (processJsonFile(filePath)) {
        fixedCount++;
      }
    }
  });
  
  return fixedCount;
}

function main() {
  console.log('🔧 Starting bullet point formatting fix...\n');
  
  let totalFixed = 0;
  
  // Get list of modules to process
  let modulesToProcess;
  if (MODULES_TO_FIX === null) {
    // Process all modules
    modulesToProcess = fs.readdirSync(LESSONS_DIR).filter(item => {
      const itemPath = path.join(LESSONS_DIR, item);
      return fs.statSync(itemPath).isDirectory();
    });
    console.log(`📋 Processing ALL modules (${modulesToProcess.length} found)\n`);
  } else {
    modulesToProcess = MODULES_TO_FIX;
    console.log(`📋 Processing ${modulesToProcess.length} specified module(s)\n`);
  }
  
  modulesToProcess.forEach(moduleName => {
    totalFixed += processModule(moduleName);
  });
  
  console.log(`\n✨ Complete! Fixed ${totalFixed} file(s).`);
}

// Run the script
main();
