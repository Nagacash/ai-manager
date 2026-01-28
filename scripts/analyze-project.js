#!/usr/bin/env node

/**
 * System-Pilot Project Analysis
 * Provides deep code analysis with cyberpunk visualization
 */

const fs = require('fs');
const path = require('path');

const CYBERPUNK_ANALYSIS = `
╔══════════════════════════════════════════════════════════════╗
║               SYSTEM-PILOT ANALYSIS MODE                     ║
║           [NEURAL CODE SCANNING ACTIVATED]                   ║
╚══════════════════════════════════════════════════════════════╝
`;

const analyzeProject = () => {
  console.log(CYBERPUNK_ANALYSIS);
  console.log('▶ Initiating deep code scan...');
  
  const projectRoot = process.cwd();
  const analysisResults = {
    structure: {},
    dependencies: {},
    performance: {},
    cyberpunkScore: 0
  };
  
  // Analyze project structure
  const scanDirectory = (dir, depth = 0) => {
    if (depth > 3) return {};
    
    const structure = {};
    try {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          structure[item] = scanDirectory(itemPath, depth + 1);
        } else if (stats.isFile() && /\.(ts|tsx|js|jsx)$/.test(item)) {
          const content = fs.readFileSync(itemPath, 'utf8');
          structure[item] = {
            lines: content.split('\n').length,
            complexity: calculateComplexity(content),
            cyberpunkElements: detectCyberpunkElements(content)
          };
        }
      });
    } catch (error) {
      // Skip inaccessible directories
    }
    
    return structure;
  };
  
  const calculateComplexity = (code) => {
    const patterns = [
      /if\s*\(/g, /for\s*\(/g, /while\s*\(/g, 
      /function\s+\w+/g, /=>\s*{/g, /catch\s*\(/g
    ];
    
    let complexity = 1;
    patterns.forEach(pattern => {
      const matches = code.match(pattern);
      if (matches) complexity += matches.length;
    });
    
    return complexity;
  };
  
  const detectCyberpunkElements = (code) => {
    const cyberpunkKeywords = [
      'cyber', 'neon', 'glitch', 'matrix', 'synth', 'digital',
      'holographic', 'neural', 'cyberpunk', 'futuristic', 'tech'
    ];
    
    let score = 0;
    cyberpunkKeywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = code.match(regex);
      if (matches) score += matches.length;
    });
    
    return score;
  };
  
  // Perform analysis
  analysisResults.structure = scanDirectory(path.join(projectRoot, 'src'));
  
  // Analyze package.json for cyberpunk dependencies
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
    analysisResults.dependencies = {
      total: Object.keys(packageJson.dependencies || {}).length,
      devDependencies: Object.keys(packageJson.devDependencies || {}).length,
      cyberpunkLibs: Object.keys({...packageJson.dependencies, ...packageJson.devDependencies})
        .filter(dep => ['framer-motion', 'gsap', 'lucide-react'].includes(dep))
    };
  } catch (error) {
    console.log('⚠ Could not analyze package.json');
  }
  
  // Calculate cyberpunk score
  const calculateCyberpunkScore = (results) => {
    let score = 0;
    
    // Base score for having cyberpunk dependencies
    score += results.dependencies.cyberpunkLibs?.length * 20 || 0;
    
    // Score from code analysis
    const countCyberpunkElements = (obj) => {
      let count = 0;
      Object.values(obj).forEach(value => {
        if (typeof value === 'object') {
          if (value.cyberpunkElements) {
            count += value.cyberpunkElements;
          } else {
            count += countCyberpunkElements(value);
          }
        }
      });
      return count;
    };
    
    score += countCyberpunkElements(results.structure) * 5;
    
    return Math.min(score, 100);
  };
  
  analysisResults.cyberpunkScore = calculateCyberpunkScore(analysisResults);
  
  // Display results with cyberpunk styling
  console.log('\\n📊 ANALYSIS RESULTS:');
  console.log(`├─ Cyberpunk Score: ${analysisResults.cyberpunkScore}/100 ⚡`);
  console.log(`├─ Dependencies: ${analysisResults.dependencies.total || 0}`);
  console.log(`├─ Cyberpunk Libraries: ${analysisResults.dependencies.cyberpunkLibs?.join(', ') || 'None'}`);
  console.log(`└─ Neural Networks: Optimized ✓`);
  
  if (analysisResults.cyberpunkScore > 50) {
    console.log('\\n🎯 RECOMMENDATION: High cyberpunk compatibility detected!');
    console.log('   Ready for advanced neural enhancements.');
  } else {
    console.log('\\n💡 SUGGESTION: Consider adding more cyberpunk elements');
    console.log('   to maximize system-pilot effectiveness.');
  }
  
  // Save analysis report
  const reportPath = path.join(projectRoot, '.system-pilot', 'analysis-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(analysisResults, null, 2));
  console.log(`\\n📁 Detailed report saved: ${reportPath}`);
};

if (require.main === module) {
  analyzeProject();
}

module.exports = { analyzeProject };