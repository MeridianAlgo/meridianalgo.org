#!/usr/bin/env node

/**
 * Manifest Generator for MeridianAlgo Learning Platform
 * 
 * This script automatically generates the manifest.json file by scanning
 * the modules directory structure. This eliminates the need to manually
 * maintain the manifest when adding new modules.
 * 
 * Usage: node scripts/generate-manifest.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LESSONS_DIR = path.join(__dirname, '../public/data/lessons');
const MODULES_DIR = path.join(LESSONS_DIR, 'modules');
const MANIFEST_PATH = path.join(LESSONS_DIR, 'manifest.json');
const LEGACY_LESSONS_DIR = LESSONS_DIR; // For backward compatibility

/**
 * Reads and parses a JSON file
 */
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Checks if a directory exists
 */
function directoryExists(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Gets all subdirectories in a directory
 */
function getSubdirectories(dirPath) {
  try {
    return fs.readdirSync(dirPath)
      .filter(item => {
        const itemPath = path.join(dirPath, item);
        return fs.statSync(itemPath).isDirectory();
      });
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
    return [];
  }
}

/**
 * Discovers and loads a module from the new modular structure
 */
function loadModuleFromDirectory(moduleId) {
  const modulePath = path.join(MODULES_DIR, moduleId);
  const moduleJsonPath = path.join(modulePath, 'module.json');
  
  if (!fs.existsSync(moduleJsonPath)) {
    console.warn(`Warning: module.json not found for ${moduleId}`);
    return null;
  }
  
  const moduleData = readJsonFile(moduleJsonPath);
  if (!moduleData) {
    return null;
  }
  
  // Validate required fields
  const requiredFields = ['id', 'title', 'description', 'difficulty', 'icon', 'color'];
  for (const field of requiredFields) {
    if (!moduleData[field]) {
      console.error(`Error: Missing required field '${field}' in ${moduleId}/module.json`);
      return null;
    }
  }
  
  // Process lessons - update contentFile paths to point to correct location
  if (moduleData.lessons) {
    moduleData.lessons = moduleData.lessons.map(lesson => ({
      ...lesson,
      contentFile: lesson.contentFile.startsWith('lessons/') 
        ? `modules/${moduleId}/${lesson.contentFile}`
        : lesson.contentFile
    }));
  }
  
  // Process quiz - update contentFile path
  if (moduleData.quiz) {
    moduleData.quiz.contentFile = moduleData.quiz.contentFile.startsWith('quiz.json')
      ? `modules/${moduleId}/quiz.json`
      : moduleData.quiz.contentFile;
  }
  
  return moduleData;
}

/**
 * Loads a module from the legacy flat structure (for backward compatibility)
 */
function loadLegacyModule(moduleId, existingManifest) {
  if (!existingManifest || !existingManifest.modules) {
    return null;
  }
  
  const legacyModule = existingManifest.modules.find(m => m.id === moduleId);
  if (!legacyModule) {
    return null;
  }
  
  console.log(`Loading legacy module: ${moduleId}`);
  return legacyModule;
}

/**
 * Generates the complete manifest
 */
function generateManifest() {
  console.log('🚀 Starting manifest generation...\n');
  
  const modules = [];
  
  // Load existing manifest for backward compatibility
  let existingManifest = null;
  if (fs.existsSync(MANIFEST_PATH)) {
    existingManifest = readJsonFile(MANIFEST_PATH);
    console.log('📄 Loaded existing manifest for reference\n');
  }
  
  // Check if modules directory exists
  if (directoryExists(MODULES_DIR)) {
    console.log('📁 Scanning modules directory...\n');
    
    const moduleDirectories = getSubdirectories(MODULES_DIR);
    
    for (const moduleId of moduleDirectories) {
      console.log(`  Processing module: ${moduleId}`);
      const moduleData = loadModuleFromDirectory(moduleId);
      
      if (moduleData) {
        modules.push(moduleData);
        console.log(`  ✅ Loaded ${moduleId} (${moduleData.lessons?.length || 0} lessons)`);
      } else {
        console.log(`  ⚠️  Skipped ${moduleId} (invalid or missing data)`);
      }
    }
    
    console.log(`\n✨ Discovered ${modules.length} modules from modular structure\n`);
  } else {
    console.log('📁 Modules directory not found, checking for legacy structure...\n');
  }
  
  // If no modules found in new structure, fall back to existing manifest
  if (modules.length === 0 && existingManifest) {
    console.log('⚠️  No modules found in new structure, using existing manifest\n');
    return existingManifest;
  }
  
  // Sort modules by difficulty
  const difficultyOrder = { 'Beginner': 0, 'Intermediate': 1, 'Advanced': 2 };
  modules.sort((a, b) => {
    const orderA = difficultyOrder[a.difficulty] ?? 99;
    const orderB = difficultyOrder[b.difficulty] ?? 99;
    return orderA - orderB;
  });
  
  const manifest = {
    modules,
    generatedAt: new Date().toISOString(),
    version: '2.0.0'
  };
  
  return manifest;
}

/**
 * Writes the manifest to file
 */
function writeManifest(manifest) {
  try {
    const manifestJson = JSON.stringify(manifest, null, 2);
    fs.writeFileSync(MANIFEST_PATH, manifestJson, 'utf8');
    console.log(`✅ Manifest written to ${MANIFEST_PATH}`);
    console.log(`📊 Total modules: ${manifest.modules.length}`);
    
    // Print summary
    const summary = manifest.modules.reduce((acc, module) => {
      acc[module.difficulty] = (acc[module.difficulty] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n📈 Module Summary:');
    Object.entries(summary).forEach(([difficulty, count]) => {
      console.log(`   ${difficulty}: ${count} modules`);
    });
    
    return true;
  } catch (error) {
    console.error('❌ Error writing manifest:', error.message);
    return false;
  }
}

/**
 * Validates the generated manifest
 */
function validateManifest(manifest) {
  console.log('\n🔍 Validating manifest...\n');
  
  let isValid = true;
  
  if (!manifest.modules || !Array.isArray(manifest.modules)) {
    console.error('❌ Manifest must have a modules array');
    return false;
  }
  
  manifest.modules.forEach((module, index) => {
    const requiredFields = ['id', 'title', 'description', 'difficulty', 'icon', 'color', 'lessons'];
    
    requiredFields.forEach(field => {
      if (!module[field]) {
        console.error(`❌ Module ${index} (${module.id || 'unknown'}) missing required field: ${field}`);
        isValid = false;
      }
    });
    
    if (module.lessons && !Array.isArray(module.lessons)) {
      console.error(`❌ Module ${module.id} lessons must be an array`);
      isValid = false;
    }
    
    if (module.lessons) {
      module.lessons.forEach((lesson, lessonIndex) => {
        if (!lesson.id || !lesson.title || !lesson.contentFile) {
          console.error(`❌ Module ${module.id}, lesson ${lessonIndex} missing required fields`);
          isValid = false;
        }
      });
    }
  });
  
  if (isValid) {
    console.log('✅ Manifest validation passed\n');
  } else {
    console.log('❌ Manifest validation failed\n');
  }
  
  return isValid;
}

/**
 * Main execution
 */
function main() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  MeridianAlgo Manifest Generator');
  console.log('═══════════════════════════════════════════════════════\n');
  
  const manifest = generateManifest();
  
  if (!manifest || manifest.modules.length === 0) {
    console.error('❌ Failed to generate manifest or no modules found');
    process.exit(1);
  }
  
  if (!validateManifest(manifest)) {
    console.error('❌ Manifest validation failed');
    process.exit(1);
  }
  
  if (writeManifest(manifest)) {
    console.log('\n✨ Manifest generation complete!\n');
    process.exit(0);
  } else {
    console.error('\n❌ Failed to write manifest\n');
    process.exit(1);
  }
}

// Run the script
main();

export { generateManifest, validateManifest };
