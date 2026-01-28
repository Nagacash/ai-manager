#!/usr/bin/env node

/**
 * System-Pilot Initialization Script
 * Sets up global system-pilot access with cyberpunk theme integration
 */

const fs = require('fs');
const path = require('path');

const CYBERPUNK_BANNER = `
╔══════════════════════════════════════════════════════════════╗
║                 SYSTEM-PILOT INITIALIZATION                  ║
║            [CYBERPUNK ENHANCEMENT PROTOCOL]                  ║
╚══════════════════════════════════════════════════════════════╝
`;

const initSystemPilot = () => {
  console.log(CYBERPUNK_BANNER);
  console.log('▶ Initializing System-Pilot global access...');
  
  // Create .system-pilot directory
  const pilotDir = path.join(process.cwd(), '.system-pilot');
  if (!fs.existsSync(pilotDir)) {
    fs.mkdirSync(pilotDir, { recursive: true });
    console.log('✓ Created .system-pilot directory');
  }
  
  // Create global config symlink
  const configPath = path.join(process.cwd(), 'config', 'system-pilot.ts');
  const globalConfigPath = path.join(pilotDir, 'global-config.ts');
  
  if (!fs.existsSync(globalConfigPath)) {
    try {
      fs.copyFileSync(configPath, globalConfigPath);
      console.log('✓ Global configuration deployed');
    } catch (error) {
      console.log('⚠ Config copy failed, creating symlink');
      fs.symlinkSync(configPath, globalConfigPath);
    }
  }
  
  // Initialize cyberpunk theme assets
  const themesDir = path.join(pilotDir, 'themes');
  if (!fs.existsSync(themesDir)) {
    fs.mkdirSync(themesDir, { recursive: true });
    
    const cyberTheme = {
      name: 'cyberpunk-neon',
      colors: {
        primary: '#FF00FF',
        secondary: '#00FFFF', 
        accent: '#00FF00',
        background: '#0A0A0F',
        neonGlow: '#FF1493'
      },
      effects: {
        glitch: true,
        scanlines: true,
        neonPulse: true,
        matrixRain: true
      }
    };
    
    fs.writeFileSync(
      path.join(themesDir, 'cyberpunk-neon.json'),
      JSON.stringify(cyberTheme, null, 2)
    );
    console.log('✓ Cyberpunk theme assets installed');
  }
  
  // Set up environment variables
  const envUpdate = `
# System-Pilot Global Configuration
SYSTEM_PILOT_ENABLED=true
SYSTEM_PILOT_GLOBAL_ACCESS=true
SYSTEM_PILOT_THEME=cyberpunk-neon
SYSTEM_PILOT_ROOT=${process.cwd()}
`;
  
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const existingEnv = fs.readFileSync(envPath, 'utf8');
    if (!existingEnv.includes('SYSTEM_PILOT')) {
      fs.appendFileSync(envPath, envUpdate);
      console.log('✓ Environment variables updated');
    }
  } else {
    fs.writeFileSync(envPath, envUpdate);
    console.log('✓ Environment configuration created');
  }
  
  console.log('\n▶ System-Pilot global access activated successfully!');
  console.log('▶ Cyberpunk enhancement protocol ready.');
  console.log('\nAvailable commands:');
  console.log('  npm run pilot:analyze   - Analyze project structure');
  console.log('  npm run pilot:optimize  - Optimize build performance');
  console.log('  npm run pilot:enhance   - Apply cyberpunk enhancements');
};

if (require.main === module) {
  initSystemPilot();
}

module.exports = { initSystemPilot };