const fs = require('fs');
const path = require('path');

// Function to fix markdown formatting in content
function fixMarkdownFormatting(content) {
  if (!content) return content;
  
  // Remove ** markdown bold markers
  content = content.replace(/\*\*([^*]+)\*\*/g, '$1');
  
  // Ensure proper spacing after colons and before lists
  content = content.replace(/:\n•/g, ':\n\n•');
  content = content.replace(/:\n\n\n•/g, ':\n\n•'); // Fix triple newlines
  
  // Ensure proper spacing between numbered items
  content = content.replace(/(\d️⃣[^\n]+)\n(\d️⃣)/g, '$1\n\n$2');
  
  // Ensure proper spacing after emoji headers
  content = content.replace(/(👍|👎|🎯|💍|👨‍👩‍👧‍👦|💼|📈|🏦|💳|📊) ([^:]+):\n([^•\n])/g, '$1 $2:\n\n$3');
  
  return content;
}

// Function to process a single lesson file
function processLessonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lesson = JSON.parse(content);
    
    let modified = false;
    
    // Process each section
    if (lesson.sections) {
      lesson.sections.forEach(section => {
        if (section.content) {
          const originalContent = section.content;
          section.content = fixMarkdownFormatting(section.content);
          if (originalContent !== section.content) {
            modified = true;
          }
        }
        
        // Fix key-points descriptions
        if (section.points) {
          section.points.forEach(point => {
            if (point.description) {
              const originalDesc = point.description;
              point.description = fixMarkdownFormatting(point.description);
              if (originalDesc !== point.description) {
                modified = true;
              }
            }
          });
        }
        
        // Fix callout content
        if (section.type === 'callout' && section.content) {
          const originalContent = section.content;
          section.content = fixMarkdownFormatting(section.content);
          if (originalContent !== section.content) {
            modified = true;
          }
        }
      });
    }
    
    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(lesson, null, 2), 'utf8');
      console.log(`✅ Fixed: ${path.basename(filePath)}`);
      return true;
    } else {
      console.log(`⏭️  Skipped (no changes): ${path.basename(filePath)}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Function to recursively find all lesson JSON files
function findLessonFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(findLessonFiles(filePath));
    } else if (file.endsWith('.json') && !file.includes('module.json') && !file.includes('quiz.json') && !file.includes('manifest.json')) {
      results.push(filePath);
    }
  });
  
  return results;
}

// Main execution
console.log('🔧 Fixing lesson formatting...\n');

const lessonsDir = path.join(__dirname, '..', 'public', 'data', 'lessons', 'modules');
const lessonFiles = findLessonFiles(lessonsDir);

console.log(`Found ${lessonFiles.length} lesson files\n`);

let fixedCount = 0;
lessonFiles.forEach(file => {
  if (processLessonFile(file)) {
    fixedCount++;
  }
});

console.log(`\n✨ Complete! Fixed ${fixedCount} out of ${lessonFiles.length} files`);
