import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LESSONS_DIR = path.join(__dirname, '../public/data/lessons/modules');

// Modules to KEEP (all others will be deleted)
const MODULES_TO_KEEP = [
  'credit-building',      // Complete - 6 lessons + quiz
  'etf-investing',        // Complete - 6 lessons + quiz
  'couples-finance',      // Active with content
  'stock-market-basics'   // Active with content
];

function deleteDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteDirectory(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

function cleanupModules() {
  console.log('🧹 Starting cleanup of lesson modules...\n');
  
  const allModules = fs.readdirSync(LESSONS_DIR).filter(item => {
    const itemPath = path.join(LESSONS_DIR, item);
    return fs.statSync(itemPath).isDirectory();
  });
  
  console.log(`📊 Found ${allModules.length} total modules`);
  console.log(`✅ Keeping ${MODULES_TO_KEEP.length} modules: ${MODULES_TO_KEEP.join(', ')}\n`);
  
  let deletedCount = 0;
  
  allModules.forEach(moduleName => {
    if (!MODULES_TO_KEEP.includes(moduleName)) {
      const modulePath = path.join(LESSONS_DIR, moduleName);
      console.log(`🗑️  Deleting: ${moduleName}`);
      deleteDirectory(modulePath);
      deletedCount++;
    } else {
      console.log(`✅ Keeping: ${moduleName}`);
    }
  });
  
  console.log(`\n✨ Cleanup complete!`);
  console.log(`   Kept: ${MODULES_TO_KEEP.length} modules`);
  console.log(`   Deleted: ${deletedCount} modules`);
}

// Run cleanup
cleanupModules();
